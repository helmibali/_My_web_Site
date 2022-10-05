import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/model/produit.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from 'src/app/services/produit.service';
@Component({
  selector: 'app-card-produit',
  templateUrl: './card-produit.component.html',
  styleUrls: ['./card-produit.component.css']
})
export class CardProduitComponent implements OnInit {
  @Input() 
  produits: Produit[];
  @Input()
  term;
  key:number;
  tcarburant:string;
  constructor(
    public authService:AuthService,
   public produitService: ProduitService,
   public router: Router
  ) { }

  ngOnInit(): void {
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
   onSelectByDelegation(e) {
    this.key = e.target.value;
    
  }
}
