import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  Data: any;
  constructor(private modelService: PostService,
    private router: Router,
    private authService: AuthService) { }

  async ngOnInit() {
    let user = await this.authService.getUser();
    this.modelService.getPostsByTypeAndAuth('Alerta', user.id).then((alerts) => {
      this.Data = alerts.map(alert =>
        Object.assign({}, {
          Titulo: alert.Title,
          Fecha: alert.Date,
          link: this.router.createUrlTree(['admin', 'edicion-alerta', alert.id]).toString()
        }))
    }, (error) => {
      alert('Hubo un error en la comunicación con el servido' + error)
    })
  }

}
