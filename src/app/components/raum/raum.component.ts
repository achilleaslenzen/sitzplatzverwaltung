import { Component, Input } from '@angular/core';
import { Reihe, ReiheComponent } from '../reihe/reihe.component';
import { CommonModule } from '@angular/common';
import { Tisch } from '../arbeitsplatz/arbeitsplatz.component';


export interface Raum {
  name: string
  reihen: Reihe[]
}

@Component({
  selector: 'app-raum',
  standalone: true,
  imports: [CommonModule ,ReiheComponent],
  templateUrl: './raum.component.html',
  styleUrl: './raum.component.scss'
})
export class RaumComponent {
  @Input() reihen: Reihe[] = [];
}
