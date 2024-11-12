import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Raum, RaumComponent } from '../components/raum/raum.component';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../components/arbeitsplatz/arbeitsplatz.component';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { ButtonComponent } from '../components/button/button.component';

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
  @ViewChild('tischPool') tischPoolRef!: ElementRef;
  @ViewChildren('tisch') tischElements!: QueryList<ElementRef>;

  raeume: Raum[] = [];
  tischePool: Tisch[] = [];

  constructor(private renderer: Renderer2) {
    this.addRaum();
  }

  ngAfterViewInit() {
    this.styleContainerWidth();
  }

  addRaum() {
    const neuerRaum: Raum = { id: Date.now(), reihen: [{ tische: [] }] };
    this.raeume.push(neuerRaum);
  }

  addArbeitsplatz() {
    if (this.tischePool.length == 6) {
      return; //TODO: display error
    }

    const neuerTisch: Tisch = {
      nummer: this.tischePool.length + 1,
      besetzt: false,
    };
    this.tischePool.push(neuerTisch);
  }

  dropRaum(event: CdkDragDrop<Tisch[]>) {
    console.log('dropped Raum');
    if (
      event.previousContainer.id === 'raeume' &&
      event.container.id === 'werkstatt'
    ) {
      {
      }
    }
  }

  dropTisch(event: CdkDragDrop<Tisch[]>) {}

  private styleContainerWidth() {
    const firstTisch = this.tischElements.first;
    if (firstTisch) {
      const tischWidth = firstTisch.nativeElement.offsetWidth;

      const gap = 10;
      const maxWidth = tischWidth * 3 + gap * 2;

      this.renderer.setStyle(
        this.tischPoolRef.nativeElement,
        'max-width',
        `${maxWidth}px`
      );
      this.renderer.setStyle(
        this.tischPoolRef.nativeElement,
        'grid-template-columns',
        `repeat(auto-fit, minmax(${tischWidth}px, 1fr))`
      );
    }
  }
}
