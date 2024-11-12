import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../arbeitsplatz/arbeitsplatz.component';
import { ButtonComponent } from '../button/button.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

export interface Reihe {
  tische: Tisch[];
}

@Component({
  selector: 'app-reihe',
  standalone: true,
  imports: [
    CommonModule,
    ArbeitsplatzComponent,
    ButtonComponent,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './reihe.component.html',
  styleUrl: './reihe.component.scss',
})
export class ReiheComponent {
  @Input() tische!: Tisch[];

  addArbeitsplatz() {
    const newTisch: Tisch = {
      nummer: this.tische.length + 1,
      besetzt: false,
    };
    this.tische.push(newTisch);
  }

  dropTisch(event: CdkDragDrop<Tisch[]>) {
    console.log('dropped Tisch');
    if (event.previousContainer === event.container) {
      moveItemInArray(this.tische, event.previousIndex, event.currentIndex);
    }
  }
}
