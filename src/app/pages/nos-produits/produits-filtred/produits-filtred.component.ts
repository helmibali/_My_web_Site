import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/model/produit.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from 'src/app/services/produit.service';
;

@Component({
  selector: 'app-produits-filtred',
  templateUrl: './produits-filtred.component.html',
  styleUrls: ['./produits-filtred.component.css']
})
export class ProduitsFiltredComponent implements OnInit {
  @Input()
  term;
  key:number;
  tcarburant:string;
  urlImgProduit=`${this.authService.backUrl}${"/api/imgp/"}`
  constructor(
   public authService:AuthService,
   public produitService: ProduitService,
   public router: Router

  ) { }

  @Input() 
  produits: Produit[];

  ngOnInit(): void {
    console.log(this.key); 
  }

  supprimerProduit(p:Produit){

    let conf = confirm("Etes vous sur ?");
    if (conf) 
    this.produitService.supprimerProduit(p.idProduit).subscribe(()=>{
      console.log("produit supprimé");
    });
    this.router.navigate(['/']).then(()=> {
      window.location.reload();
    });
   }
// essence(){
//   this.produitService.listeProdduitsByCarburant("Essence").subscribe(p=>{
//     this.produits=p;
//   })
// }

// diesel(){
//   this.produitService.listeProdduitsByCarburant("Diesel").subscribe(p=>{
//     this.produits=p;
//   })
// }

// gpl(){
//   this.produitService.listeProdduitsByCarburant("GPL").subscribe(p=>{
//     this.produits=p;
//   })
// }

// electrique(){
//   this.produitService.listeProdduitsByCarburant("Electrique").subscribe(p=>{
//     this.produits=p;
//   })
// }

onSelectByDelegation(e) {
  this.key = e.target.value;
  
}

}
