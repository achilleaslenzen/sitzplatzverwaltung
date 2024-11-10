import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


export interface Tisch {
  nummer: number;
  besetzt: boolean;
  nutzer?: string | null;
}

@Component({
  selector: 'app-arbeitsplatz',
  templateUrl: './arbeitsplatz.component.html',
  standalone: true, 
  imports: [CommonModule],
  styleUrls: ['./arbeitsplatz.component.scss']
})
export class ArbeitsplatzComponent {
  @Input() tisch!: Tisch;
  

  // Funktion, um Platz zu reservieren oder freizugeben
  toggleBelegung() {
    this.tisch.besetzt = !this.tisch.besetzt;
    this.tisch.nutzer = this.tisch.besetzt ? 'Max Mustermann' : null; // Beispielname
  }
}
