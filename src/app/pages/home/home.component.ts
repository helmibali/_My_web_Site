import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/model/produit.model';
import { ProduitService } from 'src/app/services/produit.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
term;
produits:Produit[];
  constructor(private produitService:ProduitService) { }

  ngOnInit(): void {
    
      this.produitService.listeProduits().subscribe((p) => {
        this.produits = p;
      });
    
  }
  onActivate(event) {
    // window.scroll(0,0);
  
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
  
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)
    
  }
}
