import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { LandingComponentsModule } from 'app/landing/landing-components/landing-components.module';
import { LandingLayoutRoutes } from './landing-layout.routing';

import { AdoptionListComponent } from 'app/landing/adoption-list/adoption-list.component';
import { CompanyProfileComponent } from 'app/landing/company-profile/company-profile.component';
import { HomeComponent } from 'app/landing/home/home.component';

import {
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AdoptionListComponent,
    CompanyProfileComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(LandingLayoutRoutes),
    
    LandingComponentsModule
  ]
})
export class LandingLayoutModule { }
