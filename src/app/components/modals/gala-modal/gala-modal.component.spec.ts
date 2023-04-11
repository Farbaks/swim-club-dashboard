import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaModalComponent } from './gala-modal.component';

describe('GalaModalComponent', () => {
  let component: GalaModalComponent;
  let fixture: ComponentFixture<GalaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
