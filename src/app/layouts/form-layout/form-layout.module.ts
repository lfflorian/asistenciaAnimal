import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLayoutRoutes } from './form-layout.routing';

import { AdoptionFormComponent } from 'app/form/adoption-form/adoption-form.component';
import { CompanyFormComponent } from 'app/form/company-form/company-form.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule
} from '@angular/material';
import { PipesModule } from 'app/pipes/pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    RouterModule.forChild(FormLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  declarations: [
    AdoptionFormComponent,
    CompanyFormComponent
  ]
})

export class FormLayoutModule { }
