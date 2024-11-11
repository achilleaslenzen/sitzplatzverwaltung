import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Raum, RaumComponent } from '../components/raum/raum.component';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../components/arbeitsplatz/arbeitsplatz.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-werkstatt',
  standalone: true,
  imports: [
    CommonModule,
    RaumComponent,
    ArbeitsplatzComponent,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './werkstatt.component.html',
  styleUrls: ['./werkstatt.component.scss'],
})
export class WerkstattComponent {
  raeume: Raum[] = [];
  tischePool: Tisch[] = [];

  constructor() {
    this.addArbeitsplatz(); // Beispielarbeitsplatz hinzufügen
  }

  addRaum() {
    const neuerRaum: Raum = { id: Date.now(), tische: [] };
    this.raeume.push(neuerRaum);
  }

  addArbeitsplatz() {
    const neuerTisch: Tisch = {
      nummer: this.tischePool.length + 1,
      besetzt: false,
    };
    this.tischePool.push(neuerTisch);
  }

  dropTisch(event: CdkDragDrop<Tisch[]>) {
    console.log('dropped Tisch');
    if (
      event.previousContainer.id === 'tische' &&
      event.container.id === 'raeume'
    ) {
      {
        const tisch = event.item.data;

        const raumId = parseInt(
          event.container.element.nativeElement.getAttribute('data-raum-id') ||
            '0',
          10
        );
        const raum = this.raeume.find((r) => r.id === raumId);
        if (raum) {
          raum.tische.push(tisch);
          this.tischePool = this.tischePool.filter((t) => t !== tisch);
        }
      }
    }
  }
}
