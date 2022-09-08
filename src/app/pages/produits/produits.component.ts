import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Marque } from 'src/app/model/marque.model';
import { Modele } from 'src/app/model/modele.model';
import { Produit } from 'src/app/model/produit.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from 'src/app/services/produit.service';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  addButton:string = "Ajouter";
  produits: Produit[];
  modeles: Modele[];
  marque:Marque;
  p:number=1;
  constructor(private produitService : ProduitService,
              private router : Router,
              public authService:AuthService,
              private formBuilder : FormBuilder) {
  
   }

   ngOnInit(): void {
    this.init1();
     this.init2();
    this.produitService.listeProduits().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
    console.log(this.authService.isAdmin())
  }

   supprimerProduit(p:Produit){

    let conf = confirm("Etes vous sur ?");
    if (conf) 
    this.produitService.supprimerProduit(p.idProduit).subscribe(()=>{
      console.log("produit supprimé");
    });
    this.router.navigate(['produits']).then(()=> {
      window.location.reload();
    });
   }

   activeProduit(p:Produit){
    const formData = new FormData();
    const produit = this.produitService.activeForm.value;
    formData.append('produit',JSON.stringify(produit));
     
    this.produitService.activeProduit(formData,p.idProduit).subscribe(()=>{
      console.log("active");
    });
    //this.router.navigate(['produits']).then(()=> {
       window.location.reload();
    
   }

   desactiveProduit(p:Produit){
    const formData = new FormData();
    const produit = this.produitService.dataForm.value;
    formData.append('produit',JSON.stringify(produit));
     
    this.produitService.activeProduit(formData,p.idProduit).subscribe(()=>{
      console.log("active");
    });
  //  this.router.navigate(['produits']).then(()=> {
       window.location.reload();
   // });
   }
init1(){
  this.produitService.dataForm = this.formBuilder.group({
    enabled: false,
  })
}
init2(){
  this.produitService.activeForm = this.formBuilder.group({
    enabled: true,
  })
}





}
