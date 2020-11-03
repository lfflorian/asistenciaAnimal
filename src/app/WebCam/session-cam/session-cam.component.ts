import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/model/user';
import { AuthService } from 'app/services/utilities/auth.service';
import { VideoSessionService } from 'app/services/video-session.service';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';

@Component({
  selector: 'app-session-cam',
  templateUrl: './session-cam.component.html',
  styleUrls: ['./session-cam.component.scss']
})
export class SessionCamComponent implements OnInit {
  title = 'Cam-App';
  remoteCalls: string[] = [];
  localCallId = 'agora_local';
  user: User;

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  private channel : string;

  constructor(private agoraService: NgxAgoraService,
              private route: ActivatedRoute,
              private router: Router,
              private videoSesService: VideoSessionService,
              private authService: AuthService,) {
    
  }

  async ngOnInit() {
    
    this.user = await this.authService.getUser();
    if (!this.user) {
      alert('Debes inciar session primero')
      this.router.navigateByUrl('session/singin');
    }

    this.channel  = this.route.snapshot.paramMap.get("id")

    try {
      var videoSes = await this.videoSesService.getSessionByIdSes(this.channel)
      if (videoSes.length == 0) {
        alert('Esta sesión no existe')
        this.router.navigateByUrl('session/singin');
      } 

      // debugger
      // var r = (new Date()).getTime()
      // var e = new Date(videoSes[0].Date).getTime()
      // var difDates = r-e;
      // var ras = alert(difDates/(1000*60*60*24)); 
    } catch (error) {
      alert('Esta sesión no existe')
      this.router.navigateByUrl('session/singin');
    }
    
    this.uid = Math.floor(Math.random() * 100);

    this.client = this.agoraService.createClient({ mode: 'rtc' , codec: 'h264' });
    this.assignClientHandlers();

    // Added in this step to initialize the local A/V stream
    this.localStream = this.agoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
  }

  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(null, this.channel, this.uid, onSuccess, onFailure);
  }

  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
         // The user has granted access to the camera and mic.
         this.localStream.play(this.localCallId);
         if (onSuccess) {
           onSuccess();
         }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

}
