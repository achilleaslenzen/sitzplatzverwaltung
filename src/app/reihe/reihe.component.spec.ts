import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReiheComponent } from './reihe.component';

describe('ReiheComponent', () => {
  let component: ReiheComponent;
  let fixture: ComponentFixture<ReiheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReiheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReiheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
