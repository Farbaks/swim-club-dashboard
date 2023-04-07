import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadMemberModalComponent } from './squad-member-modal.component';

describe('SquadMemberModalComponent', () => {
  let component: SquadMemberModalComponent;
  let fixture: ComponentFixture<SquadMemberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadMemberModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquadMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
