import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
 import {  GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit {
  user = new User();
  err:number = 0;
  roles:Role[];
  token:string;
  socialUser: SocialUser;
  usernames:any[];
  random:String;
  constructor(
    private authService:AuthService,
              private router:Router,
              private toastr: ToastrService,
              private formBuilder : FormBuilder,
              private _location: Location,
              public userService:UserService
  ) { }

  ngOnInit(): void {
    this.random=this.makeRandom(60,"ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    console.log("random:    "+this.random)
    this.initForm();
    this.initFormEmail();
    
    // this.authService.getUserFromDB(this.user.username).subscribe(u=>{
    //   this.user=u;
    // })
  }

  onLoggedin()
  {
      this.authService.login(this.user).subscribe((data)=> {
        let jwToken = data.headers.get('Authorization');
        this.authService.saveToken(jwToken);
        this.authService.getUserFromDB(this.user.username).subscribe(user=>{
          if(user.enabled){
            this.authService.signIn(user);
            this.toastr.success('Bienvenue!'); 
          }else{
            this.authService.logout();
            this.toastr.error('Ce compte est desactive');
          }
         
        })
        this.router.navigate(['/']);
        },(erreur)=>{ this.err = 1;
          this.toastr.error('Merci de verifier');
          this.userService.getAllUsername().subscribe(u=>{
          
          })
        });
  }

  forgotPassword(){
    // if(this.usernames.length  === 0)
    // {
    // this.toastr.error('Email n\'existe pas');
    // }
    // else
    // {
      const formData = new FormData();
        const user = this.userService.passwordToken.value;
        formData.append('user',JSON.stringify(user));
        this.userService.resetPasswordToken(formData,this.user.username).subscribe(data=>{
         console.log(data);
         this.token = data.token;
         this.initFormEmail();
         const email = this.userService.emailForm.value;
         formData.append('email',JSON.stringify(email));
         this.userService.email(formData).subscribe(data=>{
          // console.log(data);
        });
          this.router.navigateByUrl('/login');
          this.toastr.success('E-mail de réinitialisation envoyé');
        },(erreur)=>{ this.err = 1;
          this.toastr.error('Merci de verifier');
          this.userService.getAllUsername().subscribe(u=>{
          
          })
        });
    
    // }
  }
  initForm(){
    
    this.userService.passwordToken = this.formBuilder.group({
      token:new FormControl(this.random),
    });

    

  }
  initFormEmail(){
    
    this.userService.emailForm = this.formBuilder.group({
      body:new FormControl('http://localhost:4200/reset-password/'+this.token),
      subject:new FormControl('La Casse.tn :: Réinitialisation mot de passe'),
      mailTo:new FormControl(this.user.username),
    });

    

  }

  desactiveProduit(){
    const formData = new FormData();
    const user = this.userService.dataForm.value;
    formData.append('user',JSON.stringify(user));
     
    this.userService.resetPasswordToken(formData,'helmi.bali@gmail.com').subscribe((data)=>{
      console.log(data);
    });
  //  this.router.navigate(['produits']).then(()=> {
     //  window.location.reload();
   // });
   } 
usernameExist(username:string){
  this.userService.getAllUsername().subscribe(u=>{
    
    this.usernames=u.filter(u=>(u.username === username) );
     console.log(this.usernames);
     console.log(this.usernames.length)
    
  })
  
    
} 
makeRandom(lengthOfCode: number, possible: string) {
  let text = "";
  for (let i = 0; i < lengthOfCode; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
    return text;

}
backClicked() {
  this._location.back();
}

}
