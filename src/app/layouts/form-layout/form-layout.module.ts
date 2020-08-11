import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLayoutRoutes } from './form-layout.routing';

import { AdoptionFormComponent } from 'app/form/adoption-form/adoption-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AdoptionFormComponent
  ]
})

export class FormLayoutModule { }
