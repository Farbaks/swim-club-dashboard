import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimmersComponent } from './swimmers.component';

describe('SwimmersComponent', () => {
  let component: SwimmersComponent;
  let fixture: ComponentFixture<SwimmersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwimmersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwimmersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
