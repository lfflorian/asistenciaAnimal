import { Routes } from '@angular/router';
import { AdoptionListComponent } from 'app/landing/adoption-list/adoption-list.component';
import { CompanyProfileComponent } from 'app/landing/company-profile/company-profile.component';
import { HomeComponent } from 'app/landing/home/home.component';

export const LandingLayoutRoutes: Routes = [
     { path: '',      component: HomeComponent },
     { path: 'lista-adopcion',      component: AdoptionListComponent },
     { path: 'adopcion',      component: AdoptionListComponent },
     { path: 'empresa/:id',      component: CompanyProfileComponent },
];