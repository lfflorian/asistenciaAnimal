import { Routes } from '@angular/router';
import { AdoptionFormComponent } from 'app/form/adoption-form/adoption-form.component';

export const FormLayoutRoutes: Routes = [
    { path: '',      component: AdoptionFormComponent },
    { path: 'formulario-adopcion',      component: AdoptionFormComponent },
    { path: 'formulario-adopcion/:id',      component: AdoptionFormComponent }
];