import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProduitMobileComponent } from './ajouter-produit-mobile.component';

describe('AjouterProduitMobileComponent', () => {
  let component: AjouterProduitMobileComponent;
  let fixture: ComponentFixture<AjouterProduitMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterProduitMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterProduitMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
