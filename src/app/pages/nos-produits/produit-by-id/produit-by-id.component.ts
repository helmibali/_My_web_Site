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
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-produit-by-id',
  templateUrl: './produit-by-id.component.html',
  styleUrls: ['./produit-by-id.component.css']
})
export class ProduitByIdComponent implements OnInit {
  produit :Produit;
  messages:Message[];
  isLoading:boolean = false;
  errTXT:string='';
  carts:Cart[];
  loginBtn:string = "Commander";
  date=new Date();
  c = new Cart();
  user:User;
  constructor(
    private _location: Location,
    public produitService:ProduitService,
    private activatedRoute:ActivatedRoute,
    public authService:AuthService,
    public cartService:CartService,
    private router:Router,
    private toastr: ToastrService,
    private formBuilder : FormBuilder,
    public messageService:MessageService) { }
    initForm(){
     
    }
  ngOnInit(): void {
    
//     this.produitService.consulterProduit(this.activatedRoute.snapshot.params.id).subscribe(p=>{
//       this.produit=p;
//       console.log(this.produit.categorie.nomCategorie);
// });
this.initData();
//this.initForm();

this.cartService.getAll().subscribe(data=>{
  this.carts=data;
      });
  
    
}

initData(){
  this.isLoading=true;
  this.produitService.consulterProduit(this.activatedRoute.snapshot.params.id).toPromise().then(p=>{

    this.produit=p;

    this.cartService.dataForm = this.formBuilder.group({
      prix:new FormControl(this.produit.prixProduit),
      dateCreation:new FormControl(new Date()),
      user:new FormControl(this.authService.loggedUser),
      produit:new FormControl(this.produit.idProduit),
    });
    this.messageService.dataForm = this.formBuilder.group({
      auteur:new FormControl(this.authService.loggedUser), 
      emiter:new FormControl(this.produit.user.user_id),
      message:new FormControl(this.produit.nomProduit+":"),
      dateCreation:new FormControl(new Date()),
        });
  })
  .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
    this.isLoading = false;
  });
  
}

newCart(){

  this.cartService.addCart(this.c).subscribe((data)=>{
    console.log(data);
  })
}

addToCart(){
    const formData = new FormData();
    const panier = this.cartService.dataForm.value;
    formData.append('cart',JSON.stringify(panier));
  
    this.cartService.createCart(formData).toPromise().then(data=>{
      console.log(data);  
      this.carts = [...this.carts, data];
      this.toastr.success('Pièce commandé avec succés!');
      this.isLoading=true;
     window.location.reload();
     }
    ) 
    .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
      
    });
  
  
}
backClicked() {
  this._location.back();
}

onSubmit(){
  const formData = new FormData();
  const message = this.messageService.dataForm.value;
  formData.append('message',JSON.stringify(message));

  this.messageService.message(formData).toPromise().then(data=>{
    console.log(data);  
    this.toastr.success('Message envoyé!');
    this.messages = [...this.messages, data];
   }
  ) 
  .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
    
  });
}
}


