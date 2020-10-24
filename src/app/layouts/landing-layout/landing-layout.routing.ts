import { Routes } from '@angular/router';
import { AdoptionListComponent } from 'app/landing/adoption-list/adoption-list.component';
import { CompanyProfileComponent } from 'app/landing/company-profile/company-profile.component';

export const LandingLayoutRoutes: Routes = [
     { path: '',      component: AdoptionListComponent },
     { path: 'adopcion',      component: AdoptionListComponent },
     { path: 'empresa/:id',      component: CompanyProfileComponent }
];