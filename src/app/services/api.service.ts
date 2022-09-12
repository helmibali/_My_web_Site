import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private authService : AuthService) { }

  getUserslist(){
    return  this.http.get(`${this.authService.backUrl}${'/api/users/liste'}`);
  }
}
