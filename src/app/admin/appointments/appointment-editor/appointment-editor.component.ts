import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'app/model/appointment';
import { User } from 'app/model/user';
import { AppointmentService } from 'app/services/appointment.service';
import { AuthService } from 'app/services/utilities/auth.service';

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['./appointment-editor.component.scss']
})
export class AppointmentEditorComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private _fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private appointmentService: AppointmentService) { }

  user : User;
  userId : string;
  Option : string;
  Edicion : Boolean;
  appointment : Appointment;

  AppointmentForm = this._fb.group({
    DateInit: [],
    DateFinal: []
  });

  async ngOnInit() {
    let parameter = this.route.snapshot.paramMap.get("id")
    this.user = await this.authService.getUser();
    let opcion = parameter.split("-")[0];
    let id = parameter.split("-")[1];

    if (opcion == "A") {
      this.appointmentService.getAppointment(id).subscribe(info => {
        if (info !== undefined) {
          this.appointment = info
          this.AppointmentForm.controls['DateInit'].setValue(info.DateInit)
          this.AppointmentForm.controls['DateFinal'].setValue(info.DateFinal)
          this.Option = "edition"
        }
      });
      this.Edicion = true;
    } else if (opcion == "U") {
      this.userId = id;
      this.appointment = {};
      this.Option = "New-W-User"
      this.Edicion = false;
    } else {
      this.Option = "New"
      this.appointment = {};
      this.Edicion = false;
    }
  }

  async Save() {
    this.appointment.DateInit = this.AppointmentForm.get("DateInit").value;
    this.appointment.DateFinal = this.AppointmentForm.get("DateFinal").value;

    if (this.Option == "New") {
      this.appointment.Date = new Date();
      /* Aqui es donde se tomara el valor desde el usuario (correo) */
      this.appointment.IdAuthor = this.user.Id_company;
      this.appointment.IdUser = this.userId;

      this.appointmentService.createAppointment(this.appointment).then(sucess => {
        alert('Cita creada!')
        this.router.navigateByUrl('admin/citas')
      }, error => {
        alert('Hubo un error al crear la cita')
      })
    } else if (this.Option == "New-W-User")
    {
      this.appointment.Date = new Date();
      /* Aqui es donde se tomara el valor desde el usuario (correo) */
      this.appointment.IdAuthor = this.user.Id_company;
      this.appointment.IdUser = this.userId;

      this.appointmentService.createAppointment(this.appointment).then(sucess => {
        alert('Cita creada!')
        this.router.navigateByUrl('admin/citas')
      }, error => {
        alert('Hubo un error al crear la cita')
      })
    } else if (this.Option == "edition") {
      this.appointmentService.updateAppointment(this.appointment).then(sucess => {
        alert('Cita actualizada!')
        this.router.navigateByUrl('admin/citas')
      }, error => {
        alert('Hubo un error al actualizar la Cita')
      })
    }
  }

  Delete() {
    this.appointmentService.deleteAppointment(this.appointment.id).then(success => {
      alert('Cita eliminada!')
      this.router.navigateByUrl('admin/mascotas')
    }, error => {
      alert('Hubo un error al eliminar la Cita')
    })
  }

  Cancel() {
    if (confirm("Desea cancelar los cambios?"))
    {
      this.router.navigateByUrl('admin/citas')
    }
  }

}
