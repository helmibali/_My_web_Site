import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { Produit } from 'src/app/model/produit.model';
import { User } from 'src/app/model/user.model';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProduitService } from 'src/app/services/produit.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  produit :Produit;
  isLoading:boolean = false;
  errTXT:string='';
  carts:Cart[];
  loginBtn:string = "Commander";
  date=new Date();
  c = new Cart();
  constructor(
    private _location: Location,
    public produitService:ProduitService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService,
    public cartService:CartService,
    private router:Router,
    private toastr: ToastrService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.initData();
  }
  initData(){
   
   
  
      this.cartService.dataForm = this.formBuilder.group({
        prix:new FormControl(''),
        dateCreation:new FormControl(new Date()),
        user:new FormControl(this.authService.loggedUser),
        produit:new FormControl(null),
      })
  }
  
addToCart(){
  const formData = new FormData();
  const cart = this.cartService.dataForm.value;
  formData.append('cart',JSON.stringify(cart));

  this.cartService.createCart(formData).toPromise().then(data=>{
    console.log(data);  
   // this.carts = [...this.carts, data];
    this.toastr.success('Pièce commandé avec succés!');
    this.isLoading=true;
   window.location.reload();
   }
  ) 
  .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
    
  });


}
}
