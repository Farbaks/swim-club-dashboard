import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaDetailsComponent } from './gala-details.component';

describe('GalaDetailsComponent', () => {
  let component: GalaDetailsComponent;
  let fixture: ComponentFixture<GalaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
