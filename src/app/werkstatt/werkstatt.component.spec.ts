import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WerkstattComponent } from './werkstatt.component';

describe('WerkstattComponent', () => {
  let component: WerkstattComponent;
  let fixture: ComponentFixture<WerkstattComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WerkstattComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WerkstattComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
