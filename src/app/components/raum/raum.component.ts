import { Component, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../arbeitsplatz/arbeitsplatz.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Reihe, ReiheComponent } from '../reihe/reihe.component';

export interface Raum {
  id: number;
  reihen: Reihe[];
}

@Component({
  selector: 'app-raum',
  standalone: true,
  templateUrl: './raum.component.html',
  styleUrls: ['./raum.component.scss'],
  imports: [
    CommonModule,
    ReiheComponent,
    ButtonComponent,
    CdkDropList,
    CdkDrag,
  ],
})
export class RaumComponent {
  @Input() reihen: Reihe[] = [];
  @Input() raumId!: number;

  constructor() {
    this.addReihe();
  }

  addReihe() {
    const newReihe: Reihe = {
      tische: [],
    };
    this.reihen.push(newReihe);
  }

  dropTisch(event: CdkDragDrop<Tisch[]>) {
    console.log('dropped Tisch');
    if (event.previousContainer === event.container) {
      moveItemInArray(this.reihen, event.previousIndex, event.currentIndex);
    }
  }
}
