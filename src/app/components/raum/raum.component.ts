import { Component, Input } from '@angular/core';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../arbeitsplatz/arbeitsplatz.component';
import { CommonModule } from '@angular/common';

export interface Raum {
  id: number;
  tische: Tisch[];
}

@Component({
  selector: 'app-raum',
  standalone: true,
  templateUrl: './raum.component.html',
  styleUrls: ['./raum.component.scss'],
  imports: [CommonModule, ArbeitsplatzComponent, CdkDropList],
})
export class RaumComponent {
  @Input() tische: Tisch[] = [];
  @Input() raumId!: number;
}
