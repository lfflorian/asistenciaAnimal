import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { LandingLayoutRoutes } from './landing-layout.routing';

import { AdoptionListComponent } from 'app/landing/adoption-list/adoption-list.component';
import { LandingComponentsModule } from 'app/landing/landing-components/landing-components.module';

@NgModule({
  declarations: [
    AdoptionListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LandingLayoutRoutes),
    LandingComponentsModule
  ]
})
export class LandingLayoutModule { }
