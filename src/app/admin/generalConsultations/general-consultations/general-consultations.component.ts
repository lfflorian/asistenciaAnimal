import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-consultations',
  templateUrl: './general-consultations.component.html',
  styleUrls: ['./general-consultations.component.scss']
})
export class GeneralConsultationsComponent implements OnInit {

  Data: any;
  constructor(private modelService: PostService,
    private router: Router,
    private authService: AuthService) { }

  async ngOnInit() {
    let user = await this.authService.getUser();
    this.modelService.getPostsByTypeAndAuth('ConsultaGeneral', user.id).then((generalConsultation) => {
      this.Data = generalConsultation.map(consultation =>
        Object.assign({}, {
          Titulo: consultation.Title,
          Mensaje: consultation.Content,
          Fecha: consultation.Date,
          link: this.router.createUrlTree(['admin', 'edicion-consulta-general', consultation.id]).toString()
        }))
    }, (error) => {
      alert('Hubo un error en la comunicación con el servido' + error)
    })
  }
}
