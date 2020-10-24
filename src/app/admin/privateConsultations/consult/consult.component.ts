import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, PrivateConsultation } from 'app/model/privateConsultation';
import { User } from 'app/model/user';
import { PrivateConsultationService } from 'app/services/private-consultation.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private modelService: PrivateConsultationService) { }

  itsCompany : boolean = false;
  consult : PrivateConsultation;
  Message : FormControl = new FormControl();
  user : User;

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.user = await this.authService.getUser();
    this.modelService.getPrivateConsultation(Id).subscribe((response) => {
      console.log(response)
      this.consult = response;
    })

    // let user = await this.authService.getUser();
    // this.itsCompany = user.Company
    // if (this.itsCompany) {
    //   //obtener todos los chats de la empresa
    // } else {
    //   //obtener todos los chats del usuario
    // }
  }
  
  Enviar() {
    
    let message : Message;
    message = { 
      idUser : this.user.id,
      Date : new Date(),
      Images : null,
      Content : this.Message.value
    }

    this.consult.Messages.push(message);

    this.modelService.updatePrivateConsultation(this.consult).then((response) => {
      alert("Mensaje enviado")
    })
  }

}
