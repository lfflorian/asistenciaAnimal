import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/model/user';
import { AdoptionFormService } from 'app/services/adoption-form.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.scss']
})
export class AdoptionsComponent implements OnInit {

  constructor(private modelService: AdoptionFormService,
              private authService: AuthService,
              private router : Router) { }

  user : User;
  Data: any;
  
  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.modelService.getAdoptionForms(this.user.Id_company).then((pets) => {
      this.Data = pets.map(form =>
        Object.assign({}, {
          'Nombre Adoptante' : form.Nombre,
          'Nombre solicitante' : form.Nombre,
          Estado : form.Estado,
          link: this.router.createUrlTree(['admin', 'configuracion-formulario', form.id]).toString()
        }))
    }, (error) => {
      alert('Hubo un error en la comunicación con el servido')
    })
  }
}
