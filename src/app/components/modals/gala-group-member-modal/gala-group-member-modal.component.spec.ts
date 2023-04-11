import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalaGroupMemberModalComponent } from './gala-group-member-modal.component';

describe('GalaGroupMemberModalComponent', () => {
  let component: GalaGroupMemberModalComponent;
  let fixture: ComponentFixture<GalaGroupMemberModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalaGroupMemberModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalaGroupMemberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
