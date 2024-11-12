import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { RaumComponent } from '../components/raum/raum.component';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../components/arbeitsplatz/arbeitsplatz.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { Reihe } from '../components/reihe/reihe.component';

interface Raum {
  id: number;
  reihen: Reihe[]; // Passen Sie dies an die tatsächliche Struktur Ihrer Reihen an
  position: { x: number; y: number };
}

@Component({
  selector: 'app-werkstatt',
  standalone: true,
  imports: [
    CommonModule,
    RaumComponent,
    ArbeitsplatzComponent,
    ButtonComponent,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './werkstatt.component.html',
  styleUrls: ['./werkstatt.component.scss'],
})
export class WerkstattComponent {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  raeume: Raum[] = [];

  constructor() {
    this.addRaum();
  }

  addRaum() {
    const newRaum: Raum = {
      id: Date.now(),
      position: { x: 860, y: 100 },
      reihen: [{ tische: [] }],
    };
    this.raeume = [...this.raeume, newRaum];
    console.log(this.raeume);
  }

  dropRaum(event: CdkDragDrop<Raum[]>) {
    console.log('dropped Raum');
    if (event.previousContainer === event.container) {
      moveItemInArray(this.raeume, event.previousIndex, event.currentIndex);
    }
  }

  onDragEnd(event: CdkDragEnd, raum: Raum) {
    console.log('dragend');
    const dropPoint = event.dropPoint;

    // Berechne die Container-Grenzen
    const containerRect = this.container.nativeElement.getBoundingClientRect();
    const elementRect =
      event.source.element.nativeElement.getBoundingClientRect();

    // Berechne die maximalen X- und Y-Werte
    const maxX = containerRect.width - elementRect.width;
    const maxY = containerRect.height - elementRect.height;

    // Begrenze die Position auf die Container-Grenzen
    raum.position = {
      x: Math.max(0, Math.min(dropPoint.x, maxX)),
      y: Math.max(0, Math.min(dropPoint.y, maxY)),
    };

    raum.position = { x: dropPoint.x, y: dropPoint.y };
  }
}
