import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { FormLayoutComponent } from './layouts/form-layout/form-layout.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { WebCamComponent } from './WebCam/web-cam.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'page',
    pathMatch: 'full',
  }, {
    path: 'page',
    component: LandingLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/landing-layout/landing-layout.module#LandingLayoutModule'
    }]
  }, {
    path: 'session',
    component: LoginLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/login-layout/login-layout.module#LoginLayoutModule'
    }]
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }, {
    path: 'form',
    component: FormLayoutComponent,
    canActivate: [AuthenticationGuard],
    children: [{
      path: '',
      loadChildren: './layouts/form-layout/form-layout.module#FormLayoutModule'
    }]
  },
  {
    path: 'web',
    component: WebCamComponent,
    children: [{
      path: '',
      loadChildren: './WebCam/web-cam.module#WebCamModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
