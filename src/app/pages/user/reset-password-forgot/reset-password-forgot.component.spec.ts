import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordForgotComponent } from './reset-password-forgot.component';

describe('ResetPasswordForgotComponent', () => {
  let component: ResetPasswordForgotComponent;
  let fixture: ComponentFixture<ResetPasswordForgotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordForgotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
