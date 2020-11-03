import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'app/services/appointment.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor(private authService: AuthService,
              private datePipe: DatePipe,
              private router: Router,
              private modelService: AppointmentService) { }

  DataCompany: any;
  DataUser: any;
  adminUser: boolean;

  async ngOnInit() {
    let user = await this.authService.getUser();
    this.adminUser = (user.Rol.Access > 0);

    if (user.Company) {
      this.modelService.getAppointmentsByCompanyId(user.Id_company).then((appointments) => {
        this.DataCompany = appointments.map(appointment =>
          Object.assign({}, {
            'Fecha inicial': this.datePipe.transform(appointment.DateInit,'short'),
            'Fecha Final': this.datePipe.transform(appointment.DateFinal,'short'),
            'Estado': (appointment.Status) ? 'Aceptado' : 'Sin aceptar',
            link: this.router.createUrlTree(['admin', 'edicion-cita', 'A-' + appointment.id]).toString()
          }))
      }, (error) => {
        alert('Hubo un error en la comunicación con el servido' + error)
      })
    } 

    this.modelService.getAppointmentsByUserId(user.id).then((appointments) => {
      this.DataUser = appointments.map(appointment =>
        Object.assign({}, {
          'Fecha inicial': this.datePipe.transform(appointment.DateInit,'short'),
          'Fecha Final': this.datePipe.transform(appointment.DateFinal,'short'),
          'Estado': (appointment.Status) ? 'No Aceptado' : 'Aceptado',
          link: this.router.createUrlTree(['admin', 'edicion-cita', 'A-' + appointment.id]).toString()
        }))
    }, (error) => {
      alert('Hubo un error en la comunicación con el servido' + error)
    })
  }

}
