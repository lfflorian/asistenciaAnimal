import { Routes } from '@angular/router';
import { AlertsComponent } from 'app/admin/alerts/alerts/alerts.component';
import { AdoptionsComponent } from 'app/admin/adoptions/adoptions/adoptions.component';
import { AppointmentsComponent } from 'app/admin/appointments/appointments/appointments.component';
import { ArticlesComponent } from 'app/admin/articles/articles/articles.component';
import { GeneralConsultationsComponent } from 'app/admin/generalConsultations/general-consultations/general-consultations.component';
import { PrivateConsultationsComponent } from 'app/admin/privateConsultations/private-consultations/private-consultations.component';
import { PetsComponent } from 'app/admin/pets/pets/pets.component';
import { ProfileComponent } from 'app/admin/profile/profile/profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'alertas',      component: AlertsComponent },
    { path: 'adopciones',      component: AdoptionsComponent },
    { path: 'citas',      component: AppointmentsComponent },
    { path: 'articulos',      component: ArticlesComponent },
    { path: 'consultas-generales',      component: GeneralConsultationsComponent },
    { path: 'consultas-privadas',      component: PrivateConsultationsComponent },
    { path: 'mascotas',      component: PetsComponent },
    { path: 'perfil',      component: ProfileComponent }
];
