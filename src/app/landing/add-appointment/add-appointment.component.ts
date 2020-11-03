import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'app/model/appointment';
import { User } from 'app/model/user';
import { AppointmentService } from 'app/services/appointment.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private appointmentService: AppointmentService) { }

  appointment: Appointment;
  appointments: Appointment[];
  appointFormat: CalendarFormat[];
  cf: CalendarFormat;
  Id: string;
  user: User;

  AppointmentForm = this.fb.group({
    InitDate: ['', [Validators.required]],
    DateFinal: ['', [Validators.required]],
  })

  async ngOnInit() {
    this.Id  = this.route.snapshot.paramMap.get("id")
    try {
      this.user = await this.authService.getUser();
    } catch (error) {
      this.user = null;
    }
    
    this.appointments = await this.appointmentService.getAppointmentsByCompanyId(this.Id);
    this.appointments = this.appointments.filter(o => new Date(o.DateInit) >= new Date())
    this.appointments.sort(function(a,b){return new Date(a.DateInit).getTime() - new Date(b.DateInit).getTime()});
    this.creaeteCalendarOb(this.appointments)
  }

  createDate() {
    if (!this.user) {
      alert('Debes iniciar session para crear una alerta')
    }
    if (!this.AppointmentForm.valid) {
      alert('Debes llenar todos los campos requeridos')
      return
    }

    this.appointment = { 
      IdAuthor: this.Id,
      IdUser: this.user.id,
      DateInit: this.AppointmentForm.get('InitDate').value,
      DateFinal: this.AppointmentForm.get('DateFinal').value,
      Status: false,
      Date: new Date()
    }
    
    this.appointmentService.createAppointment(this.appointment).then((response) => {
      alert('Cita creada, pronto se estara validando la disponibilidad')
    })
  }

  creaeteCalendarOb(appointments : Appointment[]) {
    this.appointFormat = [];
    let actualDate;
    let countApp = appointments.length;
    let coun = 0;
    appointments.forEach(a => {
      coun++;
      if (actualDate != this.dateFormat(new Date(a.DateInit))) {
        if (this.cf) {
          this.appointFormat.push(this.cf)
        }

        actualDate = this.dateFormat(new Date(a.DateInit))
        this.cf = { day : actualDate }
        if (!this.cf.hours) {
          this.cf.hours = [];
        }
        
        this.cf.hours.push(new Date(a.DateInit).toLocaleTimeString())
      } else {
        actualDate = this.dateFormat(new Date(a.DateInit))
        this.cf.hours.push(new Date(a.DateInit).toLocaleTimeString())

        if (coun == countApp - 1) {
          this.appointFormat.push(this.cf)
        }
        //this.appointFormat.push(this.cf)
      }
    });
    console.log(this.appointFormat)
  }

  dateFormat(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

}

interface CalendarFormat {
  day?: any;
  hours?: any[]
}