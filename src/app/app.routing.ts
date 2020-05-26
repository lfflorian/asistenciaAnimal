import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AuthenticationGuard } from './guard/authentication.guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'session',
    pathMatch: 'full',
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
