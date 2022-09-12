import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from '../model/article.model';
import { Cmt } from '../model/cmt.model';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

const httpOPtions = {
  headers : new HttpHeaders({'Content-Type':'application/json'})
 };

@Injectable({
  providedIn: 'root'
})
export class CommentService {
comment:Comment;
comments:Comment[];
public dataForm: FormGroup;

  constructor(public authservice:AuthService,private authService:AuthService,
    private http: HttpClient
  ) { }
 

    addComment(formData: FormData):Observable<any>{
      let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<any>
      (`${this.authService.backUrl}${'/api/comment1'}`,formData ,{headers:httpHeaders});
    }
getCommentsByArticle(id:number):Observable<any>{
  
 
  return this.http.get<any>(`${this.authService.backUrl}${'/api/comments/article'}/${id}`);
}
    
  getComments():Observable<any>{
  
    return this.http.get<any>(`${this.authService.backUrl}${'/api/comments'}`);
  }
    createComment(text:string,parentId:number,articleId:number):Observable<Cmt>{
      let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Cmt>(`${this.authService.backUrl}${'/api/comment'}`,{
        texte: text,
        user: this.authservice.loggedUser,
        article:articleId,
        parentId,
        dateComment:new Date(),
      },{headers:httpHeaders})
    }

    listeComments():Observable<Cmt[]>{
  
      return this.http.get<Cmt[]>(`${this.authService.backUrl}${'/api/comments'}`);
    }

    deleteComment(id: number){
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      const url = `${this.authService.backUrl}${'/api/comment'}/${id}`;
      return this.http.delete(url,{headers:httpHeaders});
      }

      updateComment(id:number, text:string,parentId:number,articleId:number):Observable<Cmt>{
        let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<Cmt>(`${this.authService.backUrl}${'/api/comment'}/${id}`,{
          id,
          text: text,
          user: this.authservice.loggedUser,
          article:articleId,
          parentId,
          dateComment:new Date(),
        },{headers:httpHeaders})
      }
  

}
