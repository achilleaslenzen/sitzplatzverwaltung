import { Component } from '@angular/core';
import { Raum, RaumComponent } from '../components/raum/raum.component';
import { CommonModule } from '@angular/common';
import { ArbeitsplatzComponent, Tisch } from '../components/arbeitsplatz/arbeitsplatz.component';

@Component({
  selector: 'app-werkstatt',
  standalone: true,
  imports: [CommonModule, RaumComponent, ArbeitsplatzComponent],
  templateUrl: './werkstatt.component.html',
  styleUrls: ['./werkstatt.component.scss']
})
export class WerkstattComponent {
  raeume: Raum[] = [];
  tische: Tisch[] = [];

  addRaum() {
    const neuerRaum: Raum = {
      name: "neuer Raum",
      reihen: [
      ]
    };
    this.raeume.push(neuerRaum);
  }

  addArbeitsplatz() {
    const neuerTisch: Tisch = {
      besetzt: false,
      nummer: this.tische.length + 1

    };
    this.tische.push(neuerTisch);
  }
}
