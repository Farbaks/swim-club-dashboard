import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaResultModalComponent } from './gala-result-modal.component';

describe('GalaResultModalComponent', () => {
  let component: GalaResultModalComponent;
  let fixture: ComponentFixture<GalaResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaResultModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
