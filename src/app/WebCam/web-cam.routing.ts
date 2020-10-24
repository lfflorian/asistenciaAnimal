import { Routes } from '@angular/router';
import { SessionCamComponent } from './session-cam/session-cam.component';

export const WebCamRoutes: Routes = [
    { path: 'session/:id',  component: SessionCamComponent }
];
