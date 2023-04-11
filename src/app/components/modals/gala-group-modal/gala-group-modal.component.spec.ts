import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaGroupModalComponent } from './gala-group-modal.component';

describe('GalaGroupModalComponent', () => {
  let component: GalaGroupModalComponent;
  let fixture: ComponentFixture<GalaGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaGroupModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
