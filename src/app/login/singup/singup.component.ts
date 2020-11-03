import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/services/utilities/auth.service';
import { User } from 'app/model/user';
import { RolService } from 'app/services/rol.service';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private rolService: RolService,
    private auth: AuthService) { }

    LoginForm = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  user = {} as User;
  async createUser() {
    debugger
    var rols = await this.rolService.getRols().pipe(take(1)).toPromise();
    this.user.Rol = rols.find(r =>  r.Access == 0)
    var password = this.LoginForm.get("password").value;
    var confirmPassword = this.LoginForm.get("confirmPassword").value;
    this.user.Email = this.LoginForm.get("Email").value;
    this.user.Date = new Date();

    if (this.LoginForm.valid) {
      if (password == confirmPassword) {
        await this.auth.RegisterWithEmail(this.user, password).then((result) => {
          console.log(result) // ar
          alert("usuario creado correctamente, debes confirmar tu correo electronico")
        });
      } else
      {
        alert("Las contraseñas no son las mismas");
      }
    } else {
      alert("hacen falta campos requeridos y el email debe ser valido")
    }
  }

  ngOnInit() {
  }
}
