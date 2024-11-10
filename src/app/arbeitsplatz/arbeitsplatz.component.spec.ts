import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitsplatzComponent } from './arbeitsplatz.component';

describe('ArbeitsplatzComponent', () => {
  let component: ArbeitsplatzComponent;
  let fixture: ComponentFixture<ArbeitsplatzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbeitsplatzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArbeitsplatzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
