import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArbeitsplatzComponent, Tisch } from '../arbeitsplatz/arbeitsplatz.component';


export interface Reihe {
  tische: Tisch[];
}


@Component({
  selector: 'app-reihe',
  standalone: true,
  imports: [CommonModule, ArbeitsplatzComponent],
  templateUrl: './reihe.component.html',
  styleUrl: './reihe.component.scss'
})
export class ReiheComponent {

  @Input() reihe!: Reihe;
}
