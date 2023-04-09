import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPerformanceComponent } from './training-performance.component';

describe('TrainingPerformanceComponent', () => {
  let component: TrainingPerformanceComponent;
  let fixture: ComponentFixture<TrainingPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
