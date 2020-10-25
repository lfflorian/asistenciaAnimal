import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginLayoutRoutes } from './login-layout.routing';

import { SinginComponent } from 'app/login/singin/singin.component';
import { SingupComponent } from 'app/login/singup/singup.component';
import { ForgottenPasswordComponent } from 'app/login/forgotten-password/forgotten-password.component';
import { InformationRegisterComponent } from 'app/login/information-register/information-register.component';
import { MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(LoginLayoutRoutes),
    ReactiveFormsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule
  ],
  declarations: [
    SinginComponent,
    SingupComponent,
    ForgottenPasswordComponent,
    InformationRegisterComponent
  ]
})
export class LoginLayoutModule { }
