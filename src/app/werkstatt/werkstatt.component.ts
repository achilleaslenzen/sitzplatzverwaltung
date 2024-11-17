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
  @ViewChildren('arbeitsplatz') arbeitsplatzElements!: QueryList<ElementRef>;

  raeume: Raum[] = [];
  tische: Tisch[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.raumElements.changes.subscribe(() => {
      this.raumElements.forEach((raumElement) => this.initRaum(raumElement));
    });
    this.arbeitsplatzElements.changes.subscribe(() => {
      this.arbeitsplatzElements.forEach((element) =>
        this.initArbeitsplatz(element)
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

  addArbeitsplatz() {
    const newTisch: Tisch = {
      besetzt: false,
      nummer: 1,
    };
    this.tische = [...this.tische, newTisch];
  }

  initRaum(elementRef: ElementRef) {
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
      })
      .dropzone({
        accept: '.arbeitsplatz-container',
        ondropactivate: this.onDropActivateListener,
        ondragenter: this.onDragEnterListener,
        ondragleave: this.onDragLeaveListener,
        ondrop: this.onDropListener,
        ondropdeactivate: this.onDropDeactivateListener,
      });
  }

  onDropActivateListener = (event: any) => {
    console.log('entered the drop zone');
    event.target.classList.add('drop-active');
  };

  onDragEnterListener = (event: any) => {
    const draggableElement = event.relatedTarget;
    const dropzoneElement = event.target;

    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
  };

  onDragLeaveListener = (event: any) => {
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
  };

  onDropListener = (event: any) => {
    const raumElement = event.target;
    const raumId = raumElement.getAttribute('data-id');

    const arbeitsplatzElement = event.relatedTarget;

    const raumRect = raumElement.getBoundingClientRect();
    const arbeitsplatzRect = arbeitsplatzElement.getBoundingClientRect();

    raumElement.appendChild(arbeitsplatzElement);

    const relativeX = arbeitsplatzRect.left - raumRect.left;
    const relativeY = arbeitsplatzRect.top - raumRect.top;

    arbeitsplatzElement.style.top = `${relativeY}px`;
    arbeitsplatzElement.style.left = `${relativeX}px`;
    arbeitsplatzElement.style.transform = '';
    arbeitsplatzElement.setAttribute('data-x', '0');
    arbeitsplatzElement.setAttribute('data-y', '0');

    console.log(
      `Arbeitsplatz wurde in den Raum verschoben und zentriert: (${relativeX}, ${relativeY})`
    );

    // Finde den Raum in der Liste
    const raum = this.raeume.find((r) => r.id === parseInt(raumId, 10));
    if (raum) {
      const tischNummer = arbeitsplatzElement.getAttribute('data-nummer');
      const neuerTisch: Tisch = {
        nummer: parseInt(tischNummer, 10),
        besetzt: false,
      };
      raum.reihen[0].tische.push(neuerTisch);
      console.log(
        `Arbeitsplatz ${tischNummer} wurde dem Raum ${raumId} hinzugefügt.`
      );
    } else {
      console.error('Raum nicht gefunden!');
    }
  };

  onDropDeactivateListener = (event: any) => {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
  };

  initArbeitsplatz(elementRef: ElementRef) {
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

  dragMoveListener = (event: any) => {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  dragEndListener = (event: any) => {
    console.log('Dragging ended', event);
  };

  resizeMoveListener = (event: any) => {
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
  };
}
