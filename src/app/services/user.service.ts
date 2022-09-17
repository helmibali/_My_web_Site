import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backUrl="https://casse-back.herokuapp.com";
  users:User[];
  baseUrl:'/api/user';
  public dataForm: FormGroup;
  public passwordToken: FormGroup;
  public emailForm: FormGroup;
  constructor(private http: HttpClient, private authService : AuthService) { }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});
    return this.http.request(req);
  }

  // sendMailResetPassword(mailTo:string,subject:string,body:string):Observable<any>{
  //   return this.http.post(`${'https://casse-back.herokuapp.com/api'}/${mailTo}/${subject}/${body}`);
  // }
  getUserByToken(token: string):Observable<User> {
    return this.http.get<User>(`${this.authService.backUrl}${'/api/userByToken'}/${token}`);
  }

  
  getUserById(user_id: number):Observable<User> {
    return this.http.get<User>(`${this.authService.backUrl}${'/api/infoUserById'}/${user_id}`);
  }
  getUserByUsername(username: string):Observable<User> {
    return this.http.get<User>(`${this.authService.backUrl}${'/api/info'}/${username}`);
  }
  getAllUsername():Observable<any> {
    return this.http.get<any>(`${this.authService.backUrl}${'/api/usernames'}`);
  }

  getUserByDiscussion(username: string):Observable<any> {
    return this.http.get<any>(`${this.authService.backUrl}${'/api/user-contact'}/${username}`);
  }
  createData(formData: FormData): Observable<any> {
    return this.http.post(`${this.authService.backUrl}${'/api/signup'}`, formData);
  }
  email(formData: FormData): Observable<any> {
    return this.http.post(`${this.authService.backUrl}${'/api/email'}`, formData);
  }
  createDataSocial(formData: FormData): Observable<any> {
    return this.http.post(`${this.authService.backUrl}${'/api/user/social'}`, formData);
  }
  createDataWithFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.authService.backUrl}${'/api/inscription'}`, formData);
  }
  getRoleslist(){
    return  this.http.get(`${this.authService.backUrl}${'/api/role/liste'}`);
  }
  updateData(formData: FormData ,user_id): Observable<any> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put(`${this.authService.backUrl}${'/api/user'}/${user_id}`, formData,{headers:httpHeaders});
  }

 resetPasswordToken(formData: FormData ,username:string): Observable<User> {
   
    return this.http.put<User>(`${this.authService.backUrl}${'/api/usertoken'}/${username}`, formData);
  }
  


  updateRole(u:User,user_id:number): Observable<User> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<User>(`${this.authService.backUrl}${'/api/user'}/${user_id}`, u,{headers:httpHeaders});
  }
updateImageUser(formData:FormData , user_id):Observable<any> {
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put(`${this.authService.backUrl}${'/api/userImg'}/${user_id}`, formData,{headers:httpHeaders})
}
updateImagePw(formData:FormData , user_id):Observable<any> {
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put(`${this.authService.backUrl}${'/api/userPw'}/${user_id}`, formData,{headers:httpHeaders})
}

updatePwEmail(formData:FormData , user_id):Observable<any> {
  
  return this.http.put(`${this.authService.backUrl}${'/api/userPwEmail'}/${user_id}`, formData)
}


supprimerUtilisateur(id: number){
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  const url = `${this.authService.backUrl}${'/api/user'}/${id}`;
  return this.http.delete(url,{headers:httpHeaders});
  }
}
