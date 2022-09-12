import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Categorie } from '../model/categorie.model';
import { AuthService } from './auth.service';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };
@Injectable({
  providedIn: 'root'
})
export class CatService {
  apiURL:string = `${this.authService.backUrl}${'/api/categorie'}`;
  apiURLu:string =`${this.authService.backUrl}${'/api/categorie/update'}`; 
  apiURLd:string = `${this.authService.backUrl}${'/api/categorie/delete'}`;

  constructor(private http : HttpClient,private authService: AuthService) { }

  listeCategories():Observable<Categorie[]>{
  
    return this.http.get<Categorie[]>(`${this.authService.backUrl}${'/api/categories'}`);
  }
  consulterCategorie(id : number): Observable<Categorie>{

    const url = `${this.apiURL}/${id}`;
    return this.http.get<Categorie>(url);
  
  }

  updateCategorie(cat : Categorie ,id :number):Observable<Categorie>{
    const url = `${this.apiURLu}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Categorie>(url , cat, {headers:httpHeaders} );

  }
  ajouterCategorie(cat : Categorie):Observable<Categorie>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Categorie>(`${this.authService.backUrl}${'/api/categorie/add'}`,cat,{headers:httpHeaders});
  }
  supprimerCategorie(id: number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.apiURLd}/${id}`;
    return this.http.delete(url, {headers:httpHeaders});
    }
    listeCategorieByFamille(id:number):Observable<Categorie[]>{
      const url = `${this.authService.backUrl}${'/api/categoriesByFamille'}/${id}`;
      return this.http.get<Categorie[]>(url);
    }
}


