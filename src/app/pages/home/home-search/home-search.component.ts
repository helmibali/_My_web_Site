import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Categorie } from "src/app/model/categorie.model";
import { Delegation } from "src/app/model/delegation.model";
import { Famille } from "src/app/model/famille.model";
import { Gouvernorat } from "src/app/model/gouvernorat.model";
import { Marque } from "src/app/model/marque.model";
import { Modele } from "src/app/model/modele.model";
import { Moteur } from "src/app/model/moteur.model";
import { Produit } from "src/app/model/produit.model";
import { AuthService } from 'src/app/services/auth.service';
import { CatService } from "src/app/services/cat.service";
import { DelegationService } from "src/app/services/delegation.service";
import { FamilleService } from "src/app/services/famille.service";
import { GouvernoratService } from "src/app/services/gouvernorat.service";
import { MarqueService } from "src/app/services/marque.service";
import { ModeleService } from "src/app/services/modele.service";
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'element-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {
  essenceButton:string="Essence";
  dieselButton:string="Diesel";
  gplButton:string="GPL";
  electriqueButton:string="Electrique";
  ess:boolean=false;
  dies:boolean=false;
  gaz:boolean=false;
  elec:boolean=false;
  anneeSearch:Produit[];
  term;
  p: number = 1;
  moteurs:Moteur[];
  categories: Categorie[];
  familles:Famille[];
  marques: any[];
  produit: Produit;
  produitsSearch: Produit[];
  modeles: any[];
  modelesByMarque: any[];
  modele: Modele;
  gouvernourat: Gouvernorat;
  gouvernorats: Gouvernorat[];
  delegations: Delegation[];
  delegationsByGov: Delegation[];
  categoriesByFamille:Categorie[];
  moteursByModele:Moteur[];
  produitsCategorie: Produit[];
  selectedMarque: any = { id: 0, marqueLibelle: "" };
  selectedMoteur: any = { id: 0, libelle: "" };
  selectedGouvernorat: any = { id: 0, libelle: "" };
  selectedCategorie: any = { id: 0, nomCategorie: "" };
  selectedModele: any = { id: 0, libelleModele: "" };
  selectedDelegation: any = { id: 0, libelle: "" };
  selectedFamille: any = { id: 0, libelle: "" };
 
  constructor(
    private activatedRoute:ActivatedRoute,
    private catService: CatService,
    private produitService: ProduitService,
    private marqueService: MarqueService,
    private modeleService: ModeleService,
    private govService: GouvernoratService,
    private delegationService: DelegationService,
    private familleService: FamilleService,
    private router: Router,
    public authservice:AuthService
  ) { }

  ngOnInit(): void {
    this.catService
    .listeCategorieByFamille(this.activatedRoute.snapshot.params.categorie)
    .subscribe((data) => {
      this.categoriesByFamille = data;
    });
  this.delegationService
    .ListDelegationByGouvernourat_id(this.activatedRoute.snapshot.params.gouvernorat)
    .subscribe((data) => {
      this.delegationsByGov = data;
    });
    this.modeleService
    .getAllModelesByMarque_id(this.activatedRoute.snapshot.params.marque)
    .subscribe((data) => {
      this.modelesByMarque = data;
    });
  this.CategoriesList();
  this.marquesList();
  this.modeleList();
  this.produitList();
  this.GouvernoratsList();
  //this.DelegationsList();
  this.FamillesList();


}
FamillesList(){
  this.familleService.listeFamille().subscribe(f=>{
    this.familles = f;
    
    console.log();
  })
}

GouvernoratsList() {
  this.govService.listeGouvernorats().subscribe((g) => {
    this.gouvernorats = g;
  });
}

DelegationsList() {
  this.delegationService.ListeDelegation().subscribe((d) => {
    this.delegations = d;
  });
}

PrduitsCategorieList(id: number) {
  this.produitService.listeProduitsByCategorie(id).subscribe((data) => {
    this.produitsCategorie = data;
  });
}

CategoriesList() {
  this.catService.listeCategories().subscribe((cats) => {
    this.categories = cats;
  });
}
marquesList() {
  this.marqueService.getAllMarques().subscribe((m) => {
    this.marques = m;
  });
}

produitList() {
  this.produitService
  .listeFilter(
    0,
    0,
    0,
    0, 
    0,
    0).subscribe(p=>{
    this.produitsSearch = p.slice(p.length-8,p.length);
    console.log(p);
    this.anneeSearch = this.removeDuplicates(p,"annee");
    
  });
}




modeleList() {
  this.modeleService.getAllModeles().subscribe((mo) => {
    this.modeles = mo;
  });
}

onSelect(e) {
  const a:any=e.target.value;
  this.modeleService
    .getAllModelesByMarque_id(a)
    .subscribe((data) => {
      this.modelesByMarque = data;
    });
  this.selectedMarque.id = a;
  console.log(this.selectedMarque.id);
}

onSelectGov(e) {
  console.log(e.target?.value);
  this.delegationService
    .ListDelegationByGouvernourat_id(e.target.value)
    .subscribe((data) => {
      this.delegationsByGov = data;
    });
  this.selectedGouvernorat.id = e.target.value;
}

onSelectByFamille(e){
  console.log(e.target.value);
  this.catService
    .listeCategorieByFamille(e.target.value)
    .subscribe((data) => {
      this.categoriesByFamille = data;
    });
  this.selectedFamille.id = e.target.value;
}

onSelectByMod(e) {
 
  this.selectedModele.id = e.target.value;
}
onSelectByMoteur(e) {
  this.selectedMoteur.id = e.target.value;
}
onSelectByCat(e) {
  this.selectedCategorie.id = e.target.value;
}

onSelectByDelegation(e) {
  this.selectedDelegation.id = e.target.value;
}





reInitFilter(){
  this.selectedCategorie==0;
  this.selectedMarque==0;
  this.selectedModele==0;
  this.selectedGouvernorat==0;
  this.selectedDelegation==0;
  // this.produitList();
  this.router.navigate(['/']).then(()=> {
    window.location.reload();
  });
  
}
filter2(){
  this.router
  .navigate(['/nos-produits-filtree',this.selectedFamille.id,this.selectedCategorie.id,this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id,this.selectedDelegation.id]).then(()=> {
    window.location.reload();
  });
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
essence(){
if(!this.ess){
  this.produitsSearch 
  =
  this.produitsSearch.filter(p=>(p.carburant === "Essence") );
  this.essenceButton="Essence X"
}


else {
  this.router
  .navigate(['/nos-produits-filtree',this.selectedFamille.id,this.selectedCategorie.id,this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id,this.selectedDelegation.id]).then(()=> {
    window.location.reload();
  });
}
this.ess =!this.ess;
}

diesel(){
if(!this.dies){
  this.produitsSearch 
  =
  this.produitsSearch.filter(p=>(p.carburant === "Diesel") );
  this.dieselButton="Diesel X"
}

else {
  this.router
  .navigate(['/nos-produits-filtree',this.selectedFamille.id,this.selectedCategorie.id,this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id,this.selectedDelegation.id]).then(()=> {
    window.location.reload();
  });
}
this.dies =!this.dies;

}

gpl(){
if(!this.gaz){
  this.produitsSearch 
  =
  this.produitsSearch.filter(p=>(p.carburant === "GPL") );
  this.gplButton="GPL X"
}

else {
  this.router
  .navigate(['/nos-produits-filtree',this.selectedFamille.id,this.selectedCategorie.id,this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id,this.selectedDelegation.id]).then(()=> {
    window.location.reload();
  });
}
this.gaz =!this.gaz;
}

electrique(){
if(!this.elec){
  this.produitsSearch  = this.produitsSearch.filter(p=>(p.carburant === "Electrique") );
  this.electriqueButton="Electrique X"
}

else {
  this.router
  .navigate(['/nos-produits-filtree',this.selectedFamille.id,this.selectedCategorie.id,this.selectedMarque.id,this.selectedModele.id,this.selectedGouvernorat.id,this.selectedDelegation.id]).then(()=> {
    window.location.reload();
  });
}
this.elec =!this.elec;
}
removeDuplicates(originalArray, prop) {
var newArray = [];
var lookupObject  = {};

for(var i in originalArray) {
   lookupObject[originalArray[i][prop]] = originalArray[i];
}

for(i in lookupObject) {
    newArray.push(lookupObject[i]);
}
 return newArray;
}

anneeClick(annee:number){
this.produitsSearch = this.produitsSearch.filter(p=>(p.annee === annee) );  
console.log(this.produitsSearch)
}
}
