import { Component, Input } from '@angular/core';
import { Reihe, ReiheComponent } from '../reihe/reihe.component';
import { CommonModule } from '@angular/common';

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
