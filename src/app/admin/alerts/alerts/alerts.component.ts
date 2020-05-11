import { Component, OnInit } from '@angular/core';
import { AlertService } from 'app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  Data: any;
  constructor(private modelService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.modelService.getAlerts().subscribe(alerts => {
      this.Data = alerts.map(alert =>
        Object.assign({}, {
          Titulo: alert.Title,
          Fecha: alert.Date,
          link: this.router.createUrlTree(['admin', 'edicion-alerta', alert.id]).toString()
        }))
    }, error => {
      alert('Hubo un error en la comunicación con el servido')
    });
  }

}
