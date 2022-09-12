import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Produit } from '../model/produit.model';
import { Modele } from '../model/modele.model';
import { Marque } from '../model/marque.model';
import { Categorie } from '../model/categorie.model';
const httpOPtions = {
 headers : new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

apiURL : string =  `${this.authService.backUrl}${'/api/produits'}`;
produits :Produit[];
 produit :Produit;
 public modeles:Modele[];
 public marque:Marque;
 public categorie:Categorie;
 public dataForm: FormGroup;
 public activeForm: FormGroup;
 public desactiveForm: FormGroup;
 

  constructor(private http : HttpClient, private authService : AuthService) { 
   this.listeProduits();
   this.listeCategories();
   this.listeModele();
  }
  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
    return this.http.request(req);
  }

  createData(formData: FormData): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    return this.http.post(`${this.authService.backUrl}${"/api/produit/add"}`, formData, {headers:httpHeaders});
  }
  supprimerProduit(id: number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
    const url = `${this.authService.backUrl}${'/api/produit/delete'}/${id}`;
    return this.http.delete(url, {headers:httpHeaders} );
    }

  updateData(formData: FormData,id:number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put(`${this.authService.backUrl}${'/api/produit'}/${id}`, formData,{headers:httpHeaders});
  }

  activeProduit(formData: FormData,id:number): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put(`${this.authService.backUrl}${'/api/activeProduit'}/${id}`, formData,{headers:httpHeaders});
  }



 
  listeProduitsEnabled():Observable<Produit[]>{

    return this.http.get<Produit[]>(`${this.authService.backUrl}${'api/produitsenabled'}`);
  }


listeProduits():Observable<Produit[]>{

  return this.http.get<Produit[]>(this.apiURL);
}
ProdByModGov(id_marque,id_mod,id_gouvernorat):Observable<Produit[]>{
const url = `${this.authService.backUrl}${'/api/produit/modeleByGov'}/${id_marque}/${id_mod}/${id_gouvernorat}`;
return this.http.get<Produit[]>(url);
}

listeProduitsByCategorie(id: number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit_cat'}/${id}`;
  return this.http.get<Produit[]>(url);
}
listeProduitsByUser(user_id: number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/user'}/${user_id}`;
  return this.http.get<Produit[]>(url);
}
listeProdduitsByModele(id_mod:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/modele'}/${id_mod}`;
  return this.http.get<Produit[]>(url);
}
listeProdduitsByModeleAndCategorieAndMarque(id_mod:number,id_cat:number,id_marque:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/modelebycat'}/${id_mod}/${id_cat}/${id_marque}`;
  return this.http.get<Produit[]>(url);
}

listeProdduitsByModeleAndCategorieAndGouvernorat(id_mod:number,id_cat:number,id_gouvernorat:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/modele'}/${id_mod}/${id_cat}/${id_gouvernorat}`;
  return this.http.get<Produit[]>(url);
}

listeProdduitsByModeleAndCategorieAndGouvernoratAndDelegation(id_mod:number,id_cat:number,id_gouvernorat:number,id_delegation):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/modele'}/${id_mod}/${id_cat}/${id_gouvernorat}/${id_delegation}`;
  return this.http.get<Produit[]>(url);
}
listeProdduitsByGouvernoratAndDelegation(id_gouvernorat:number,id_delegation:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/delegationAndGouvernorat'}/${id_gouvernorat}/${id_delegation}`;
  return this.http.get<Produit[]>(url);
}

listeProdduitsByGouvernorat(id_gouvernorat:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/gouvernorat'}/${id_gouvernorat}`;
  return this.http.get<Produit[]>(url);
}

listeProdduitsByCarburant(carburant:string):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit-par-carburant'}/${carburant}`;
  return this.http.get<Produit[]>(url);
}



listeProdduitsByGouvernoratAndMarque(id_gouvernorat:number,id_marque:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/gouvernoratAndMarque'}/${id_gouvernorat}/${id_marque}`;
  return this.http.get<Produit[]>(url);
}

listeProdduitsByMarque(id_marque:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/marque'}/${id_marque}`;
  return this.http.get<Produit[]>(url);
}

listeProduitsByMarque(id_marque:number):Observable<Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/marque'}/${id_marque}`;
  return this.http.get<Produit[]>(url); 
}

listeProdduitsByMarqueAndCategorie(id_marque:number, id_cat:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/marque/categorie'}/${id_marque}/${id_cat}`;
  return this.http.get<Produit[]>(url);
}



listeProdduitsByGouvernoratAndDelegationAndMarque(id_gouvernorat:number,id_marque:number,id_delegation:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/gouvernoratAndMarqueAndDelegation'}/${id_gouvernorat}/${id_marque}/${id_delegation}`;
  return this.http.get<Produit[]>(url);
}

listeProdduitsByGouvernoratAndDelegationAndMarqueAndCategorie(id_gouvernorat:number,id_marque:number,id_delegation:number,id_cat:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/gouvernoratAndMarqueAndDelegationAndCategorie'}/${id_gouvernorat}/${id_marque}/${id_delegation}/${id_cat}`;
  return this.http.get<Produit[]>(url);
}

listeFilter(id_famille:number,id_cat:number,id_marque:number,id_modele:number,id_gouvernorat:number,id_delegation:number,):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit-search'}/${id_famille}/${id_cat}/${id_marque}/${id_modele}/${id_gouvernorat}/${id_delegation}`;
  return this.http.get<Produit[]>(url);
}

listeProdduitsByGouvernoratAndMarqueAndCategorie(id_gouvernorat:number,id_marque:number,id_cat:number):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/gouvernoratAndMarqueAndCategorie'}/${id_gouvernorat}/${id_marque}/${id_cat}`;
  return this.http.get<Produit[]>(url);
}


listeProdduitsByDelegationAndModeles(id_delegation:number,id_mod:number):Observable <Produit[]>{
  let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url = `${this.authService.backUrl}${'/api/produit/delegationAndModeles'}/${id_delegation}/${id_mod}`;
  return this.http.get<Produit[]>(url,{headers:httpHeaders});
}

listeProdduitsByGouvernoratAndCategorie(id_gouvernorat:number,id_cat):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/gouvernoratAndCategorie'}/${id_gouvernorat}/${id_cat}`;
  return this.http.get<Produit[]>(url);
}
listeProdduitsByDelegationAndCategorie(id_delegation:number,id_cat):Observable <Produit[]>{
  const url = `${this.authService.backUrl}${'/api/produit/delegationAndCategorie'}/${id_delegation}/${id_cat}`;
  return this.http.get<Produit[]>(url);
}

listeCategories():Observable<Categorie[]>{
  
  return this.http.get<Categorie[]>(`${this.authService.backUrl}${'/api/categories'}`);
}

listeModele(): Observable<any> {
   
  return this.http.get(`${this.authService.backUrl}${'/api/modeles'}`);
}
consulterModele(id : number): Observable<Modele>{

  const url = `${this.authService.backUrl}${'/api/modele'}/${id}`;
  return this.http.get<Modele>(url);

}


ajouterProduit(prod: Produit):Observable<Produit>{
 return this.http.post<Produit>(`${this.authService.backUrl}${'/api/produit/addd'}`, prod, httpOPtions);
}

ajouterCategorie(cat : Categorie):Observable<Categorie>{
  return this.http.post<Categorie>(`${this.authService.backUrl}${'/api/produit/add'}`,cat,httpOPtions);
}




consulterProduit(id : number): Observable<Produit>{

  const url = `${this.authService.backUrl}${'/api/produit'}/${id}`;
  return this.http.get<Produit>(url);

}

consulterCategorie(id : number): Observable<Categorie>{

  const url = `${this.authService.backUrl}${'/api/categorie'}/${id}`;
  return this.http.get<Categorie>(url);

}


trierProduits(){
  this.produits = this.produits.sort((n1,n2) => {
    if (n1.idProduit > n2.idProduit){
      return 1;
    }
    if (n1.idProduit > n2.idProduit) {
      return -1;
    }
    return 0;
  });
}



updateProduit(prod : Produit):Observable<Produit>{
return this.http.put<Produit>(this.apiURL, prod, httpOPtions);
}
 getProduitModeles(id :number){
  this.produits.forEach((curProduit) => {
      if( curProduit.idProduit == id ) {
      this.modeles = curProduit.modeles;
      }
      });
}



}
