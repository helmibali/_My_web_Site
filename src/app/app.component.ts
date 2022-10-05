import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shop';
  termApp;
  darkModeEnabled:boolean = false;
  
 constructor(public authService:AuthService,
              private router: Router){}
ngOnInit() {
     let isloggedin: string;
   let loggedUser:string;
   isloggedin = localStorage.getItem('isloggedIn');
   loggedUser = localStorage.getItem('loggedUser');
  this.authService.loadToken();
   if (this.authService.getToken()==null || 
       this.authService.isTokenExpired())
       {}
           else{
            this.authService.setLoggedUserFromLocalStorage(loggedUser);
           }
 
   
 
//  }   
 }

 onActivate(event) {
  // window.scroll(0,0);

  window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
   });

   //or document.body.scrollTop = 0;
   //or document.querySelector('body').scrollTo(0,0)
  
}


}

