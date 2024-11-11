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
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Raum, RaumComponent } from '../components/raum/raum.component';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../components/arbeitsplatz/arbeitsplatz.component';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-werkstatt',
  standalone: true,
  imports: [
    CommonModule,
    RaumComponent,
    ArbeitsplatzComponent,
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
    this.addArbeitsplatz();
  }

  ngAfterViewInit() {
    this.styleContainerWidth();
  }

  addRaum() {
    const neuerRaum: Raum = { id: Date.now(), tische: [] };
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

  dropTisch(event: CdkDragDrop<Tisch[]>) {
    console.log('dropped Tisch');
    if (
      event.previousContainer.id === 'tische' &&
      event.container.id === 'raeume'
    ) {
      {
        const tisch = event.item.data;

        const raumId = parseInt(
          event.container.element.nativeElement.getAttribute('data-raum-id') ||
            '0',
          10
        );
        const raum = this.raeume.find((r) => r.id === raumId);
        if (raum) {
          raum.tische.push(tisch);
          this.tischePool = this.tischePool.filter((t) => t !== tisch);
        }
      }
    }
  }

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
