import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { LandingComponentsModule } from 'app/landing/landing-components/landing-components.module';
import { LandingLayoutRoutes } from './landing-layout.routing';

import { AdoptionListComponent } from 'app/landing/Pet/adoption-list/adoption-list.component';
import { CompanyProfileComponent } from 'app/landing/Company/company-profile/company-profile.component';
import { HomeComponent } from 'app/landing/home/home.component';

import { CopmanyListComponent } from 'app/landing/Company/copmany-list/copmany-list.component';
import { ArticleListComponent } from 'app/landing/Article/article-list/article-list.component';
import { ConsultListComponent } from 'app/landing/Consult/consult-list/consult-list.component';
import { AlertListComponent } from 'app/landing/Alert/alert-list/alert-list.component';
import { AlertViewComponent } from 'app/landing/Alert/alert-view/alert-view.component';
import { ArticleViewComponent } from 'app/landing/Article/article-view/article-view.component';
import { UserViewComponent } from 'app/landing/Company/user-view/user-view.component';
import { ConsultViewComponent } from 'app/landing/Consult/consult-view/consult-view.component';
import { PetViewComponent } from 'app/landing/Pet/pet-view/pet-view.component';

@NgModule({
  declarations: [
    AdoptionListComponent,
    CompanyProfileComponent,
    HomeComponent,
    CopmanyListComponent,
    ArticleListComponent,
    ConsultListComponent,
    AlertListComponent,
    AlertViewComponent,
    ArticleViewComponent,
    ConsultViewComponent,
    PetViewComponent,
    UserViewComponent
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
