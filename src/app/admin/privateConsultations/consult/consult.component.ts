import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'app/model/pet';
import { Message, PrivateConsultation } from 'app/model/privateConsultation';
import { User } from 'app/model/user';
import { PetService } from 'app/services/pet.service';
import { PrivateConsultationService } from 'app/services/private-consultation.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private petService: PetService,
              private modelService: PrivateConsultationService) { }

  itsCompany : boolean = false;
  consult : PrivateConsultation;
  pet : Pet;
  Message : FormControl = new FormControl('', Validators.required);
  user : User;

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.user = await this.authService.getUser();
    this.consult = await this.modelService.getPrivateConsultation(Id).pipe(take(1)).toPromise();
    if (this.consult.idMascota) {
      this.pet = await this.petService.getPet(this.consult.idMascota).pipe(take(1)).toPromise();
      console.log(this.pet)
    }
  }
  
  Enviar() {
    if (!this.Message.valid) {
      alert("Debes escribir un mensaje para enviar")
      return
    }

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

  medicalHistory(id : string) {
    this.router.navigateByUrl('admin/historial-medico/' + id)
  }

}
