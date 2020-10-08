import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginLayoutRoutes } from './login-layout.routing';

import { SinginComponent } from 'app/login/singin/singin.component';
import { SingupComponent } from 'app/login/singup/singup.component';
import { ForgottenPasswordComponent } from 'app/login/forgotten-password/forgotten-password.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(LoginLayoutRoutes),
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [
    SinginComponent,
    SingupComponent,
    ForgottenPasswordComponent
  ]
})
export class LoginLayoutModule { }
