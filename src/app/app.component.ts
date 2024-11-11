import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RaumComponent } from './components/raum/raum.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { WerkstattComponent } from './werkstatt/werkstatt.component';
import { ArbeitsplatzComponent } from './components/arbeitsplatz/arbeitsplatz.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RaumComponent,
    WerkstattComponent,
    StartseiteComponent,
    ArbeitsplatzComponent,
    DragDropModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
