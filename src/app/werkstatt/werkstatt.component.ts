import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Raum, RaumComponent } from '../components/raum/raum.component';
import {
  ArbeitsplatzComponent,
  Tisch,
} from '../components/arbeitsplatz/arbeitsplatz.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import interact from 'interactjs';

@Component({
  selector: 'app-werkstatt',
  standalone: true,
  imports: [
    CommonModule,
    RaumComponent,
    ArbeitsplatzComponent,
    ButtonComponent,
  ],
  templateUrl: './werkstatt.component.html',
  styleUrls: ['./werkstatt.component.scss'],
})
export class WerkstattComponent implements AfterViewInit {
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  @ViewChildren('raum') raumElements!: QueryList<ElementRef>;

  raeume: Raum[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.raumElements.changes.subscribe(() => {
      this.raumElements.forEach((raumElement) =>
        this.initializeInteract(raumElement)
      );
    });
  }

  addRaum() {
    const newRaum: Raum = {
      id: Date.now(),
      reihen: [{ tische: [] }],
    };
    this.raeume = [...this.raeume, newRaum];
    console.log(this.raeume);
  }

  initializeInteract(elementRef: ElementRef) {
    interact(elementRef.nativeElement)
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: 'parent',
          }),
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 },
          }),
        ],
        listeners: {
          move: this.resizeMoveListener,
        },
        inertia: true,
      })
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'self',
            endOnly: true,
          }),
          interact.modifiers.restrictEdges({
            outer: 'parent',
          }),
        ],
        autoScroll: true,
        listeners: {
          move: this.dragMoveListener,

          end: this.dragEndListener,
        },
      });
  }

  resizeMoveListener(event: any) {
    const target = event.target;
    let x = parseFloat(target.getAttribute('data-x')) || 0;
    let y = parseFloat(target.getAttribute('data-y')) || 0;

    target.style.width = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x.toString());
    target.setAttribute('data-y', y.toString());
  }

  dragMoveListener(event: any) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  dragEndListener(event: any) {
    console.log('Dragging ended', event);
  }
}
