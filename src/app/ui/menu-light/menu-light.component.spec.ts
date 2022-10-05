import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLightComponent } from './menu-light.component';

describe('MenuLightComponent', () => {
  let component: MenuLightComponent;
  let fixture: ComponentFixture<MenuLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
