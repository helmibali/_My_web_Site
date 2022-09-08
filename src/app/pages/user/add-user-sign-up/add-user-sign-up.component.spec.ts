import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserSignUpComponent } from './add-user-sign-up.component';

describe('AddUserSignUpComponent', () => {
  let component: AddUserSignUpComponent;
  let fixture: ComponentFixture<AddUserSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
