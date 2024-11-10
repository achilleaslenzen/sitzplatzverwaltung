import { Routes } from '@angular/router';
import { StartseiteComponent } from './startseite/startseite.component';
import { WerkstattComponent } from './werkstatt/werkstatt.component';

export const routes: Routes = [
  { path: '', component: StartseiteComponent },
  { path: 'werkstatt', component: WerkstattComponent }
];
