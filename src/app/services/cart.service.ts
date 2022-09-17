import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { Cart } from '../model/cart.model';
import { Panier } from '../model/panier.model';
import { AuthService } from './auth.service';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public dataForm: FormGroup;
  constructor(private http: HttpClient, 
     private authService : AuthService) { }
  createCart(formData: FormData):Observable<Panier>{
     return this.http.post<Panier>(`${this.authService.backUrl}${'/api/panier'}`,formData);
  }

  addCart(c:Cart):Observable<any>{
    // let jwt = this.authService.getToken();
    // jwt = "Bearer "+jwt;
    // let httpHeaders = new HttpHeaders({"Authorization":jwt})
return this.http.post<any>(`${this.authService.backUrl}${'/api/c'}`,c)
//return this.http.post<any>(`${'http://localhost:8081'}${'/api/c'}`,c)
  }

  getAll():Observable<any>{
    return this.http.get(`${this.authService.backUrl}${'/api/liste-cart'}`);
      }

      getByUsername(username:string):Observable<any>{
        const url = `${this.authService.backUrl}${'/api/liste-cart'}/${username}`;
        return this.http.get(url);
          }

          prixByUsername(username:string):Observable<any>{
            const url = `${this.authService.backUrl}${'/api/prix-cart'}/${username}`;
            return this.http.get(url);
              }

              getByUsernameEnCours(username:string):Observable<any>{
                const url = `${this.authService.backUrl}${'/api/liste-cart-en-cours'}/${username}`;
                return this.http.get(url);
                  }

        getByUsernameEnCommade(username:string):Observable<any>{
          const url = `${this.authService.backUrl}${'/api/liste-cart-en-commande'}/${username}`;
          return this.http.get(url);
            }

              
supprimerCart(id: number){
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url = `${this.authService.backUrl}${'/api/cart'}/${id}`;
  return this.http.delete(url,{headers:httpHeaders});
  }

}
