import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadModalComponent } from './squad-modal.component';

describe('SquadModalComponent', () => {
  let component: SquadModalComponent;
  let fixture: ComponentFixture<SquadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
