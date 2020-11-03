import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/services/utilities/auth.service';
import { User } from 'app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

    LoginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
    })

  ResetPassword() {
    var email = this.LoginForm.get("Email").value;
    if (this.LoginForm.valid) {
      this.auth.resetPasswordInit(email).then((data) => {
        console.log(data)
        alert("Se ha enviado a tu correo para reiniciar la contraseña")
      }, (error) => {
        switch (error.code) {
          case "auth/wrong-password":
            alert("Contraseña incorrecta");
            break;
          case "auth/user-not-found":
            alert("Usuario no existe");
            break;
          case "auth/too-many-requests":
            alert("Fueron varios intentos, prueba mas tarde");
            break;
        }
      });
    } else 
    {
      alert("hacen falta campos requeridos")
    }
  }

  ngOnInit() {
  }

}
