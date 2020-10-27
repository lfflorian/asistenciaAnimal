import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionForm } from 'app/model/AdoptionForm';
import { Pet } from 'app/model/pet';
import { User } from 'app/model/user';
import { AdoptionFormService } from 'app/services/adoption-form.service';
import { PetService } from 'app/services/pet.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modelService: AdoptionFormService,
              private router: Router,
              private authService: AuthService,
              private petService: PetService) { }

  Form : AdoptionForm
  adminUser : boolean;
  user : User;
  pet: Pet;
  
  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    this.user = await this.authService.getUser();

    this.Form = await this.modelService.getAdoptionForm(Id).pipe(take(1)).toPromise(); 

    this.pet = await this.petService.getPet(this.Form.IdMascota).pipe(take(1)).toPromise();

    this.adminUser = (this.user.Id_company == this.Form.IdEmpresa)
  }

  seleccion(valor : boolean) {
    this.Form.Estado = (valor) ? 'Aceptado' : 'Rechazado' 
    this.modelService.updateAdoptionForm(this.Form).then((result) => {
      alert("Formulario Actualizado")
      this.router.navigateByUrl('admin/adopciones')
    });
  }

  confirmado() {
    this.Form.Estado = 'Confirmado'
    this.modelService.updateAdoptionForm(this.Form).then((result) => {
      this.router.navigateByUrl('admin/adopciones')
    });

    this.pet.IdUser = this.Form.IdUsuario;
    this.pet.InAdoption = false;

    this.petService.updatePet(this.pet).then((result) => {
      alert("Formulario Actualizado")
      this.router.navigateByUrl('admin/adopciones')
    });
  }

  Print() {
    window.print()
  }
}
