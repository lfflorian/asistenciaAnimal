import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/services/utilities/auth.service';
import { User } from 'app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  LoginForm = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  async loginUser() {
    var email = this.LoginForm.get("Email").value;
    var password = this.LoginForm.get("password").value;

    if (this.LoginForm.valid) {
      this.auth.LoginWithEmail(email, password).then((data) => {
        if (data.user.emailVerified) {
          this.router.navigate(['admin'])
        } else {
          alert("Usuario no a confirmado correo")
        }
      }, (error) => {
        console.log(error)
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
    } else {
      alert("hacen falta campos requeridos y el email debe ser valido")
    }
  }

  ngOnInit() {
  }

}
