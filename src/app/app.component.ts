import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { RaumComponent } from './components/raum/raum.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,RaumComponent, DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  raum1Reihen = [
  { tische: [
      { nummer: 1, besetzt: true, nutzer: 'Anna Schmidt' },
      { nummer: 2, besetzt: false },
      { nummer: 3, besetzt: false }
    ] 
  },
  { tische: [
      { nummer: 4, besetzt: true, nutzer: 'Max Mustermann' },
      { nummer: 5, besetzt: false },
      { nummer: 6, besetzt: false }
    ]
  } 
]

raum2Reihen = [
  { tische: [
      { nummer: 1, besetzt: true, nutzer: 'Anna Schmidt' },
      { nummer: 2, besetzt: false }   
     ] 
  }
]

raum3Reihen = [
  { tische: [
      { nummer: 1, besetzt: true, nutzer: 'Anna Schmidt' },
      { nummer: 2, besetzt: false }   
     ] 
  }
]

raum4Reihen = [
  { tische: [
      { nummer: 1, besetzt: true, nutzer: 'Anna Schmidt' },
      { nummer: 2, besetzt: false },
      { nummer: 3, besetzt: false }
    ] 
  },
  { tische: [
      { nummer: 4, besetzt: true, nutzer: 'Max Mustermann' },
      { nummer: 5, besetzt: false },
      { nummer: 6, besetzt: false }
    ]
  } 
]

raeume = [
    { reihen: this.raum1Reihen }, // Raum 1
    { reihen: this.raum2Reihen }, // Raum 2
    { reihen: this.raum3Reihen }, // Raum 3
    { reihen: this.raum4Reihen }  // Raum 4
  ];



  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.raeume, event.previousIndex, event.currentIndex);
  }
}
