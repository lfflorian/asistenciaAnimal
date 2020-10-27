import { Routes } from '@angular/router';
import { AdoptionListComponent } from 'app/landing/adoption-list/adoption-list.component';
import { AlertListComponent } from 'app/landing/alert-list/alert-list.component';
import { ArticleListComponent } from 'app/landing/article-list/article-list.component';
import { CompanyProfileComponent } from 'app/landing/company-profile/company-profile.component';
import { ConsultListComponent } from 'app/landing/consult-list/consult-list.component';
import { CopmanyListComponent } from 'app/landing/copmany-list/copmany-list.component';
import { HomeComponent } from 'app/landing/home/home.component';

export const LandingLayoutRoutes: Routes = [
     { path: '',      component: HomeComponent },
     { path: 'lista-adopcion',      component: AdoptionListComponent },
     { path: 'adopcion',      component: AdoptionListComponent },
     { path: 'empresa/:id',      component: CompanyProfileComponent },
     { path: 'listado-empresas',      component: CopmanyListComponent },
     { path: 'listado-articulos',      component: ArticleListComponent },
     { path: 'listado-consultas',      component: ConsultListComponent },
     { path: 'listado-alertas',      component: AlertListComponent },
];