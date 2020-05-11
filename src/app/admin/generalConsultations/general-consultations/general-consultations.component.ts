import { Component, OnInit } from '@angular/core';
import { generalConsultationService } from 'app/services/general-consultation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-consultations',
  templateUrl: './general-consultations.component.html',
  styleUrls: ['./general-consultations.component.scss']
})
export class GeneralConsultationsComponent implements OnInit {

  Data: any;
  constructor(private modelService: generalConsultationService,
    private router: Router) { }

  ngOnInit() {
    this.modelService.getGeneralConsultations().subscribe(generalConsultation => {
      this.Data = generalConsultation.map(consultation =>
        Object.assign({}, {
          Titulo: consultation.Title,
          Mensaje: consultation.Message,
          Fecha: consultation.Date,
          link: this.router.createUrlTree(['admin', 'edicion-consulta-general', consultation.id]).toString()
        }))
    }, error => {
      alert('Hubo un error en la comunicación con el servido')
    });
  }

}
