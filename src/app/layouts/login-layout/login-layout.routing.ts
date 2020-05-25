import { Routes } from '@angular/router';
import { SinginComponent } from 'app/login/singin/singin.component';
import { SingupComponent } from 'app/login/singup/singup.component';
import { ForgottenPasswordComponent } from 'app/login/forgotten-password/forgotten-password.component';

export const LoginLayoutRoutes: Routes = [
    { path: '',      component: SinginComponent },
    { path: 'singin',      component: SinginComponent },
    { path: 'singup',      component: SingupComponent },
    { path: 'forgottenpassword',      component: ForgottenPasswordComponent },
];
