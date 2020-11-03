import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreCrudService } from 'app/class/FireStoreManagment';
import { VideoSession } from 'app/model/VideoSession';

@Injectable({
  providedIn: 'root'
})
export class VideoSessionService {

  Model : string = "SesionVideo";
  private crudService: FirestoreCrudService<VideoSession>;
  constructor(private afs: AngularFirestore) { 
    this.crudService = new FirestoreCrudService<VideoSession>(afs, this.Model);
  }

  getSessionByIdSes(id : string) {
    return this.crudService.listByReference(id,'IdCall');
  }

  createVideoSession(user: VideoSession) {
    return this.crudService.add(user);
  }

  updateVideoSession(user: VideoSession) {
    return this.crudService.update(user);
  }
}
