import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gouvernorat } from '../model/gouvernorat.model';
import { AuthService } from './auth.service';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class GouvernoratService {

  constructor(private http : HttpClient,private authService: AuthService) { }

  listeGouvernorats():Observable<Gouvernorat[]>{
  
    return this.http.get<Gouvernorat[]>(`${this.authService.backUrl}${'/api/gouvernorats'}`);
  }
  ajouter(d : Gouvernorat):Observable<Gouvernorat>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Gouvernorat>(`${this.authService.backUrl}${'/api/gouvernorat'}`,d,{headers:httpHeaders});
  }
}
