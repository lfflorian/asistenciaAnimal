import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/utilities/auth.service';
import { PetService } from 'app/services/pet.service';
import { CompanyService } from 'app/services/company.service';
import { AdoptionFormService } from 'app/services/adoption-form.service';
import { Pet } from 'app/model/pet';
import { Company } from 'app/model/company';
import { User } from 'app/model/user';
import { take } from 'rxjs/Operators';
import { AdoptionForm } from 'app/model/AdoptionForm';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.scss']
})
export class AdoptionFormComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private petService: PetService,
    private companyService: CompanyService,
    private formService: AdoptionFormService,
  ) { }

  pet : Pet;
  user : User;
  company : Company;

  AdoptionForm = this._fb.group({
    IdUsuario : [''],
    IdMascota : [''],
    IdEmpresa : [''],
    Date : [''],
    Estado : [''],
    NombreAdoptivo : [''],
    Nombre : [''],
    Apellido : [''],
    NoDPI : [''],
    Email : [''],
    Telefono : [''],
    Celular : [''],
    Direccion : [''],
    NoPersonasEnCasa : [''],
    NoPerrosEnCasa : [''],
    LugarSinEscapar : [''],
    TienePatio : [''],
    TieneJardin : [''],
    TieneSuficienteEspacio : [''],
    AmbienteADormir : [''],
    DescripcionDelLugarADormir : [''],
    AceptanMascotas : [''],
    RazonDeAdopcion : [''],
    CompromisoCuidarlo : [''],
    CompromisoCambioHogar : [''],
    CompromisoGastos : [''],
    CompromisoEnvioFotografias : [''],
    ConcienciaDeRetiro : [''],
    CompromisoPaciencia : [''],
    HorarioDeActividades : [''],
    PersonaResponsableEnHorasNoHabiles : [''],
    Facebook : [''],
    instagram : [''],
    ImagenesDelLugar : [''],
    PerrosEnCasa : this._fb.array(
      [this._fb.group({
        Genero : [''],
        BuenCoportamiento : [''],
        EsEsterilizado : [''],
    })]), 
    PersonasEnCasa : this._fb.array(
      [this._fb.group({
        Edad : [''],
        TienenAlergia : [''],
        Alergia : [''],
        EstaDeacuerdo : [''],
    })])
  })

  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")

    if (Id !== null) {
      try {
        this.user = await this.authService.getUser();
      } catch (error) {
        this.user = null;
      }
      
      this.pet = await this.petService.getPet(Id).pipe(take(1)).toPromise(); 
      this.company = await this.companyService.getCompany(this.pet.IdCompany).pipe(take(1)).toPromise();

    this.AdoptionForm.controls['IdUsuario'].setValue(this.user.id);
    this.AdoptionForm.controls['IdMascota'].setValue(Id);
    this.AdoptionForm.controls['IdEmpresa'].setValue(this.user.Id_company);
    }
  }

  async save() {
    this.AdoptionForm.controls['Date'].setValue(new Date());
    this.AdoptionForm.controls['Estado'].setValue('Enviado');
    
    this.formService.createAdoptionForm(this.AdoptionForm.value as AdoptionForm).then((response) => {
      alert('Gracias por llenar el formulario de adopcion, tus datos han sido enviados, pronto estaran en contacto contigo')
      this.router.navigateByUrl('')
    });
  }
  
  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/alertas')
    }
  }

}
