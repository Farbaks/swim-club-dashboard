import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsModalComponent } from './trainings-modal.component';

describe('TrainingsModalComponent', () => {
  let component: TrainingsModalComponent;
  let fixture: ComponentFixture<TrainingsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
