import { Routes } from '@angular/router';
import { AdoptionListComponent } from 'app/landing/Pet/adoption-list/adoption-list.component';
import { AlertListComponent } from 'app/landing/Alert/alert-list/alert-list.component';
import { ArticleListComponent } from 'app/landing/Article/article-list/article-list.component';
import { CompanyProfileComponent } from 'app/landing/Company/company-profile/company-profile.component';
import { ConsultListComponent } from 'app/landing/Consult/consult-list/consult-list.component';
import { CopmanyListComponent } from 'app/landing/Company/copmany-list/copmany-list.component';
import { HomeComponent } from 'app/landing/home/home.component';
import { UserViewComponent } from 'app/landing/Company/user-view/user-view.component';
import { PetViewComponent } from 'app/landing/Pet/pet-view/pet-view.component';
import { ConsultViewComponent } from 'app/landing/Consult/consult-view/consult-view.component';
import { AlertViewComponent } from 'app/landing/Alert/alert-view/alert-view.component';
import { ArticleViewComponent } from 'app/landing/Article/article-view/article-view.component';

export const LandingLayoutRoutes: Routes = [
     { path: '',      component: HomeComponent },
     { path: 'lista-adopcion',      component: AdoptionListComponent },
     { path: 'adopcion',      component: AdoptionListComponent },
     { path: 'empresa/:id',      component: CompanyProfileComponent },
     { path: 'usuario/:id',      component: UserViewComponent },
     { path: 'mascota/:id',      component: PetViewComponent },
     { path: 'consulta/:id',      component: ConsultViewComponent },
     { path: 'articulo/:id',      component: ArticleViewComponent },
     { path: 'alerta/:id',      component: AlertViewComponent },
     { path: 'listado-empresas',      component: CopmanyListComponent },
     { path: 'listado-articulos',      component: ArticleListComponent },
     { path: 'listado-consultas',      component: ConsultListComponent },
     { path: 'listado-alertas',      component: AlertListComponent },
];