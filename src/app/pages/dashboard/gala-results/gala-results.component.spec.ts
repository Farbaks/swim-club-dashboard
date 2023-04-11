import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaResultsComponent } from './gala-results.component';

describe('GalaResultsComponent', () => {
  let component: GalaResultsComponent;
  let fixture: ComponentFixture<GalaResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
