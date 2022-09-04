import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Categorie } from '../model/categorie.model';
import { Delegation } from '../model/delegation.model';
import { Famille } from '../model/famille.model';
import { Gouvernorat } from '../model/gouvernorat.model';
import { Marque } from '../model/marque.model';
import { Modele } from '../model/modele.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../produit.service';
import { CatService } from '../services/cat.service';
import { DelegationService } from '../services/delegation.service';
import { GouvernoratService } from '../services/gouvernorat.service';
import { MarqueService } from '../services/marque.service';
import { ModeleService } from '../services/modele.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styles: [
  ]
})
export class UpdateProduitComponent implements OnInit {
  p :Produit;
  familles:Famille[];
  categoriesByFamille:Categorie[];
  selectedMarque: any = {id:0, marqueLibelle:''};
  selectedMoteur: any = { id: 0, libelle: "" };
  selectedGouvernorat: any={id:0,  libelle:''};
  selectedDelegation: any={id:0,  libelle:''};
  selectedFamille: any = { id: 0, libelle: "" };
  selectedCategorie: any = { id: 0, nomCategorie: "" };
  currentProduit = new Produit();
  
  modeles:Modele[];
  marques:any[];
  dropdownSettings;
  categories: Categorie[];
  categorie: Categorie;
  userFile ;
  imgURL: any;
  public imagePath;
  public message: string;
  editProduit:FormGroup;
  delegations:Delegation[];
  gouvernorats:Gouvernorat[];

  constructor(public produitService:ProduitService,
              private activatedRoute:ActivatedRoute,
              private modeleService : ModeleService,
              private marqueService : MarqueService,
              private gouvernoratService : GouvernoratService,
              private delegationService : DelegationService,
              private toastr: ToastrService,
              private formBuilder : FormBuilder,
              private catService : CatService,
              private router:Router,
              private authService: AuthService ) { 
        
                this.produitService.dataForm = this.formBuilder.group({
                  nomProduit:'',
                  prixProduit:null,
                  dateCreation:'',
                  modeles : [],
                  categorie_id:null,
                  enabled: null,
                  carburant:'',
                  delegation_id: '',
                  user: '',
                  annee: '',
                  description:'',
                })
                
              }

       

  ngOnInit(): void {
        this.produitService.consulterProduit(this.activatedRoute.snapshot.params.id).subscribe(p=>{
         this.currentProduit=p;
         this.p=p;
         console.log(this.currentProduit);

         this.marqueService.getAllMarques().subscribe(m=>{

          this.marques=m;
        })

        this.gouvernoratService.listeGouvernorats().subscribe(g=>{
          this.gouvernorats=g;
        })
  
         this.produitService.listeModele().subscribe(m=>{
          this.modeles=m;});
          this.produitService.listeCategories().subscribe(c=>{
            this.categories=c;});
          this.produitService.dataForm = new FormGroup({
          nomProduit:new FormControl(this.currentProduit.nomProduit),
          prixProduit:new FormControl(this.currentProduit.prixProduit),
          dateCreation:new FormControl(new Date()),
          modeles : new FormControl(this.currentProduit.modeles),
          categorie_id : new FormControl(this.currentProduit.categorie.id),
          enabled: new FormControl(this.currentProduit.enabled),
          carburant: new FormControl(this.currentProduit.carburant),
          delegation_id: new FormControl(this.currentProduit.delegation.id),
          user: new FormControl(this.authService.loggedUser),
          annee: new FormControl(this.currentProduit.annee),
          description:new FormControl(this.currentProduit.description),
        });
      });
            
       // console.log(this.currentProduit)

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'libelleModele',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All'
        };

    
    
  }


  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
  
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }  
}

onItemSelect($event){
  //console.log('$event is ', $event); 
}

getObjectListFromData(ids){
  return this.modeles.filter(item => ids.includes(item.id))
}

onSubmit(){
  const formData = new FormData();
  const produit = this.produitService.dataForm.value;
  formData.append('produit',JSON.stringify(produit));
  formData.append('file',this.userFile);
  this.produitService.updateData(formData,this.currentProduit.idProduit).subscribe(data=>{
    console.log(data);
    this.router.navigate(['/produits']);
    window.location.reload();
  });
}

onSelect(e){
  console.log(e.target.value);

  this.modeleService.getAllModelesByMarque_id(e.target.value).subscribe(data=>{
    this.modeles = data;
  })
}

onSelectGov(e){
  console.log(e.target.value);
  this.delegationService.ListDelegationByGouvernourat_id(e.target.value).subscribe(data=>{
    this.delegations = data;
    
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





}
