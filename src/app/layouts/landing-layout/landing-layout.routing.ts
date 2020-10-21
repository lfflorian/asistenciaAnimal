import { Routes } from '@angular/router';
import { AdoptionListComponent } from 'app/landing/adoption-list/adoption-list.component';

export const LandingLayoutRoutes: Routes = [
     { path: '',      component: AdoptionListComponent },
     { path: 'adopcion',      component: AdoptionListComponent }
];