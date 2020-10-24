import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionCamComponent } from './session-cam/session-cam.component';
import { RouterModule } from '@angular/router';
import { WebCamRoutes } from './web-cam.routing';


@NgModule({
  declarations: [
    SessionCamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WebCamRoutes),
  ]
})
export class WebCamModule { }
