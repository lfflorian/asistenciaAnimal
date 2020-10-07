import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { AuthService } from 'app/services/utilities/auth.service';
import { PetService } from 'app/services/pet.service';
import { CompanyService } from 'app/services/company.service';
import { AdoptionFormService } from 'app/services/adoption-form.service';

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


  AdoptionForm = this._fb.group({
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
    let user = await this.authService.getUser();

    if (Id !== null) {
      this.petService.getPet(Id).subscribe(pet => {
        this.companyService.getCompany(pet.IdCompany).subscribe(copmany => {
          // este momento sera para obtener la compañia
        })
      }, error => {
        // go out
      });
    } else {
      // go out
    }
  }

  async save() {

  }
  
  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/alertas')
    }
  }

}
