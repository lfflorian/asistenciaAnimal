import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivateConsultation } from 'app/model/privateConsultation';
import { User } from 'app/model/user';
import { VideoSession } from 'app/model/VideoSession';
import { PrivateConsultationService } from 'app/services/private-consultation.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { VideoSessionService } from 'app/services/video-session.service';

@Component({
  selector: 'app-private-consultations',
  templateUrl: './private-consultations.component.html',
  styleUrls: ['./private-consultations.component.scss']
})
export class PrivateConsultationsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private videoSesService: VideoSessionService,
    private modelService: PrivateConsultationService) { }

  itsCompany : boolean = false;
  consultations : PrivateConsultation[];
  CompanyConsults : any;
  Userconsults : any;
  user : User;

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.itsCompany = this.user.Company
    if (this.itsCompany) {
      //obtener todos los chats de la empresa
      this.modelService.getConsultationsByCompany(this.user.Id_company).then((consults) => {
        this.CompanyConsults = consults.map(consult =>
          Object.assign({}, {
            Usuario: consult.UserName,
            Fecha: consult.Date,
            link: this.router.createUrlTree(['admin', 'consulta', consult.id]).toString()
          }))
      }, (error) => {
        alert('Hubo un error en la comunicación con el servido')
      })
    } 
    
    //obtener todos los chats del usuario
    this.modelService.getConsultationsByUser(this.user.id).then((consults) => {
      this.Userconsults = consults.map(consult =>
        Object.assign({}, {
          Empresa: consult.CompanyName,
          Fecha: consult.Date,
          link: this.router.createUrlTree(['admin', 'consulta', consult.id]).toString()
        }))
    }, (error) => {
      alert('Hubo un error en la comunicación con el servido')
    })
  }

  urlGenerated : string;
  videoSes : VideoSession;
  generateLink() {
    let uid = this.GuidGenerate();

    this.videoSes  = {
      Date : new Date(),
      IdCall : uid,
      IdUserCreator : this.user.id,
      status: true
    }

    this.videoSesService.createVideoSession(this.videoSes).then((response) => {
      this.urlGenerated =  `${window.location.hostname}/web/session/${uid}`
    })
  }

  copyToClickBoard() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.urlGenerated;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert('copiado en el porta papeles')
  }

  GuidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
