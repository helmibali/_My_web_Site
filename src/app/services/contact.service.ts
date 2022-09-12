import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public dataForm: FormGroup;
  constructor(private http: HttpClient,private authService: AuthService) { }

  createData(formData: FormData): Observable<any> {
    return this.http.post(`${this.authService.backUrl}${"/api/contact"}`, formData);
  }

  getAll():Observable<any>{
return this.http.get(`${this.authService.backUrl}${"/api/contact/liste"}`);
  }
}
