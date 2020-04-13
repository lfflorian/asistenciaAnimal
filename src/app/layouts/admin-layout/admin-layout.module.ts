import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { AlertsComponent } from 'app/admin/alerts/alerts/alerts.component';
import { AdoptionsComponent } from 'app/admin/adoptions/adoptions/adoptions.component';
import { AppointmentsComponent } from 'app/admin/appointments/appointments/appointments.component';
import { ArticlesComponent } from 'app/admin/articles/articles/articles.component';
import { GeneralConsultationsComponent } from 'app/admin/generalConsultations/general-consultations/general-consultations.component';
import { PrivateConsultationsComponent } from 'app/admin/privateConsultations/private-consultations/private-consultations.component';
import { PetsComponent } from 'app/admin/pets/pets/pets.component';
import { ProfileComponent } from 'app/admin/profile/profile/profile.component';
import { AdminComponentsModule } from 'app/admin/admin-components/admin-components.module';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AdminComponentsModule
  ],
  declarations: [
    AlertsComponent, 
    AdoptionsComponent,
    AppointmentsComponent,
    ArticlesComponent,
    GeneralConsultationsComponent,
    PrivateConsultationsComponent,
    PetsComponent,
    ProfileComponent
  ]
})

export class AdminLayoutModule {}

