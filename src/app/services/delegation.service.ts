import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delegation } from '../model/delegation.model';
import { AuthService } from './auth.service';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class DelegationService {

  constructor(private http : HttpClient,private authService: AuthService) { }

  ListeDelegation():Observable<Delegation[]>{
    return this.http.get<Delegation[]>(`${this.authService.backUrl}${'/api/delegations'}`)
  }

  ListDelegationByGouvernourat_id(id:number):Observable<any>{
    return this.http.get<any>(`${this.authService.backUrl}${'/api/delegations'}/${id}`)
  }

  ajouterDelegation(d : Delegation):Observable<Delegation>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Delegation>(`${this.authService.backUrl}${'/api/delegation'}`,d,{headers:httpHeaders});
  }
}
