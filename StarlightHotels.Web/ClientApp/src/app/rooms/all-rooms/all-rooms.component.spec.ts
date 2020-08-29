import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllroomComponent } from './all-rooms.component';

describe('AllRoomsComponent', () => {
  let component: AllroomComponent;
  let fixture: ComponentFixture<AllroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllroomComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
