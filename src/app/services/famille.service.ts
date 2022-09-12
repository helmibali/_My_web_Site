import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Famille } from '../model/famille.model';
import { AuthService } from './auth.service';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  constructor(private http:HttpClient,private authService: AuthService) { }

  listeFamille():Observable<Famille[]>{
    return this.http.get<Famille[]>(`${this.authService.backUrl}${'/api/familles'}`);
  }
  familleById(id:number):Observable<Famille>{
    return this.http.get<Famille>(`${this.authService.backUrl}${'/api/famille'}`);
  }
  ajouterCategorie(f : Famille):Observable<Famille>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Famille>(`${this.authService.backUrl}${'/api/famille'}`,f,{headers:httpHeaders});
  }
  
}
