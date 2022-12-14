import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cmt } from '../model/cmt.model';
import { Commande } from '../model/commande.model';
import { AuthService } from './auth.service';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  public dataForm: FormGroup;
  public activeForm: FormGroup;
  constructor(private http: HttpClient, 
    private authService : AuthService) { }


   
  
  
    getAll():Observable<any>{
      return this.http.get(`${this.authService.backUrl}${'/api/commande/liste'}`);
        }

        create(formData: FormData):Observable<any>{
          // let jwt = this.authService.getToken();
          // jwt = "Bearer "+jwt;
          // let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.post(`${this.authService.backUrl}${'/api/commande'}`, formData );
          //return this.http.post(`${'http://localhost:8081'}${'/api/commande'}`, formData );
        }

        
        validate(formData: FormData, id: number):Observable<any>{
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.put(`${this.authService.backUrl}${'/api/commande/etat'}/${id}`, formData , {headers:httpHeaders});
        }
}
