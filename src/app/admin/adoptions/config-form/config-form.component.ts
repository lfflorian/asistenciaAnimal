import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionForm } from 'app/model/AdoptionForm';
import { AdoptionFormService } from 'app/services/adoption-form.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss']
})
export class ConfigFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private modelService: AdoptionFormService,
              private router: Router) { }

  Form : AdoptionForm
  async ngOnInit() {
    let Id  = this.route.snapshot.paramMap.get("id")
    
    this.Form = await this.modelService.getAdoptionForm(Id).pipe(take(1)).toPromise(); 
  }

  seleccion(valor : boolean) {
    this.Form.Estado = (valor) ? 'Aceptado' : 'Rechazado' 
    this.modelService.updateAdoptionForm(this.Form).then((result) => {
      alert("Formulario Actualizado")
      this.router.navigateByUrl('admin/adopciones')
    });
  }
}
