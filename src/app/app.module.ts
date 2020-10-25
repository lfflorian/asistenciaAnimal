import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { FormLayoutComponent } from './layouts/form-layout/form-layout.component';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { WebCamComponent } from './WebCam/web-cam.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore/public_api';
import { AngularFireStorageModule } from '@angular/fire/storage/public_api';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgSurveysModule } from 'ng-surveys';
import { environment } from 'environments/environment';
import { CommonModule } from '@angular/common';
import { NgxAgoraModule } from 'ngx-agora';
import { AddToCalendarModule } from 'add-events-to-google-calendar';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgSurveysModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId }),
    AddToCalendarModule 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginLayoutComponent,
    FormLayoutComponent,
    LandingLayoutComponent,
    WebCamComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
