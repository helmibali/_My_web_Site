import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Marque } from '../model/marque.model';
import { AuthService } from './auth.service';
const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };


@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  baseUrl:'/api/marque';
  marques: Marque[];
  host:'localhost:8085';
public dataForm: FormGroup;
 
  constructor(private http: HttpClient,private authService:AuthService) { }

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
   return this.http.post(`${this.authService.backUrl}${"/api/marque"}`, formData,{headers:httpHeaders});
  }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.authService.backUrl}${'/api/marque'}/${id}`);
  }
  updateMarque(formData: FormData):Observable<Marque>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Marque>(`${this.authService.backUrl}${'/api/marque'}`, formData,{headers:httpHeaders});
    }
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  getAll(): Observable<any> {
   
    return this.http.get(`${this.authService.backUrl}${'/api/marques'}`);
  }
  supprimerProduit(id: number){
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    const url = `${this.authService.backUrl}${'/api/marque'}/${id}`;
    return this.http.delete(url, {headers:httpHeaders});
    }
    consulterMarque(id : number): Observable<Marque>{
      const url = `${this.authService.backUrl}${'/api/marque'}/${id}`;
      return this.http.get<Marque>(url);
    }
    getAllMarques():Observable<any>{
      return this.http.get<any>(`${this.authService.backUrl}${'/api/marques'}`);
    }
}

