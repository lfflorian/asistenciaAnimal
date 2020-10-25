import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'app/services/appointment.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private modelService: AppointmentService) { }

  Data: any;

  async ngOnInit() {
    let user = await this.authService.getUser();

    if (user.Company) {
      this.modelService.getAppointmentsByCompanyId(user.Id_company).then((appointments) => {
        this.Data = appointments.map(appointment =>
          Object.assign({}, {
            'Fecha inicial': appointment.DateInit,
            'Fecha Final': appointment.DateFinal,
            link: this.router.createUrlTree(['admin', 'edicion-cita', 'A-' + appointment.id]).toString()
          }))
      }, (error) => {
        alert('Hubo un error en la comunicación con el servido' + error)
      })
    } else {
      this.modelService.getAppointmentsByUserId(user.id).then((appointments) => {
        this.Data = appointments.map(appointment =>
          Object.assign({}, {
            'Fecha inicial': appointment.DateInit,
            'Fecha Final': appointment.DateFinal,
            link: this.router.createUrlTree(['admin', 'edicion-cita', 'A-' + appointment.id]).toString()
          }))
      }, (error) => {
        alert('Hubo un error en la comunicación con el servido' + error)
      })
    }
  }

}
