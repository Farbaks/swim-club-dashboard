import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalasComponent } from './galas.component';

describe('GalasComponent', () => {
  let component: GalasComponent;
  let fixture: ComponentFixture<GalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
