import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { AlertsComponent } from 'app/admin/alerts/alerts/alerts.component';
import { AlertEditorComponent } from 'app/admin/alerts/alert-editor/alert-editor.component';
import { AdoptionsComponent } from 'app/admin/adoptions/adoptions/adoptions.component';
import { AppointmentsComponent } from 'app/admin/appointments/appointments/appointments.component';
import { ArticlesComponent } from 'app/admin/articles/articles/articles.component';
import { ArticleEditorComponent } from 'app/admin/articles/article-editor/article-editor.component';
import { GeneralConsultationsComponent } from 'app/admin/generalConsultations/general-consultations/general-consultations.component';
import { GeneralConsultationEditorComponent } from 'app/admin/generalConsultations/general-consultation-editor/general-consultation-editor.component';
import { PrivateConsultationsComponent } from 'app/admin/privateConsultations/private-consultations/private-consultations.component';
import { PetsComponent } from 'app/admin/pets/pets/pets.component';
import { ProfileComponent } from 'app/admin/profile/profile/profile.component';
import { AdminComponentsModule } from 'app/admin/admin-components/admin-components.module';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { PetEditorComponent } from 'app/admin/pets/pet-editor/pet-editor.component';





@NgModule({
  imports: [
    CKEditorModule,
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
    AlertEditorComponent, 
    AdoptionsComponent,
    AppointmentsComponent,
    ArticlesComponent,
    ArticleEditorComponent,
    GeneralConsultationsComponent,
    GeneralConsultationEditorComponent,
    PrivateConsultationsComponent,
    PetsComponent,
    PetEditorComponent,
    ProfileComponent
  ]
})

export class AdminLayoutModule {}

