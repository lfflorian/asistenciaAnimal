import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'app/model/appointment';
import { User } from 'app/model/user';
import { AppointmentService } from 'app/services/appointment.service';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/utilities/auth.service';
import { take } from 'rxjs/Operators';

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
              private appointmentService: AppointmentService,
              private userService: UserService) { }

  user : User;
  userInvited : User;
  userId : string;
  Option : string;
  Edicion : Boolean;
  appointment : Appointment;
  adminUser: boolean;
  itsOwner: boolean
  Correo : FormControl = new FormControl();

  AppointmentForm = this._fb.group({
    DateInit: [, Validators.required],
    DateFinal: [, Validators.required],
    Status: ['']
  });

  async ngOnInit() {
    let parameter = this.route.snapshot.paramMap.get("id")
    this.user = await this.authService.getUser();
    this.adminUser = (this.user.Rol.Access > 0);
    let opcion = parameter.split("-")[0];
    let id = parameter.split("-")[1];

    if (opcion == "A") {
      this.appointmentService.getAppointment(id).subscribe(info => {
        if (info !== undefined) {
          this.appointment = info
          this.AppointmentForm.controls['DateInit'].setValue(info.DateInit)
          this.AppointmentForm.controls['DateFinal'].setValue(info.DateFinal)
          this.AppointmentForm.controls['Status'].setValue(info.Status)

          this.itsOwner = (info.IdAuthor == this.user.Id_company)
          
          this.Option = "edition"
        }
      });
      this.Edicion = true;
    } else if (opcion == "U") {
      this.userId = id;
      this.userInvited = await this.userService.getUser(id).pipe(take(1)).toPromise();
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
    if (!this.AppointmentForm.valid) {
      alert("Debes llenar los campos requeridos")
      return
    }

    this.appointment.DateInit = this.AppointmentForm.get("DateInit").value;
    this.appointment.DateFinal = this.AppointmentForm.get("DateFinal").value;
    this.appointment.Status = this.AppointmentForm.get("Status").value;

    if (this.Correo.value) {
      var u = await this.userService.getUserByEmail(this.Correo.value);
      if (!u[0]) {
        if (confirm("El Usuario no existe, decea agregar de todos modos la cita?"))
        {
        } else {
          return;
        }
      } else {
        this.appointment.IdUser = u[0].id;
      }
    }

    if (this.Option == "New") {
      this.appointment.Date = new Date();
      /* Aqui es donde se tomara el valor desde el usuario (correo) */
      this.appointment.IdAuthor = this.user.Id_company;
      this.appointment.IdUser = this.userId;

      this.appointmentService.createAppointment(this.appointment).then(sucess => {
        alert('Cita creada!')
        this.router.navigateByUrl('admin/edicion-cita/A-' + sucess.id)
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
