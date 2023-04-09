import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPerformanceModalComponent } from './training-performance-modal.component';

describe('TrainingPerformanceModalComponent', () => {
  let component: TrainingPerformanceModalComponent;
  let fixture: ComponentFixture<TrainingPerformanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingPerformanceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPerformanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
