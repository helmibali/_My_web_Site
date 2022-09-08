import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import {  GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  @Input()
  loginBtn;

  user = new User();
err:number = 0;
roles:Role[];
  constructor(
    private authService:AuthService,
              private router:Router,
              private toastr: ToastrService,
               
              private userService:UserService
  ) { }

  ngOnInit(): void {
    this.userService.getRoleslist().subscribe((r:any[])=>{
      this.roles=r;
      console.log(r);
     });
  }
 // window.location.reload();
 onLoggedin()
 {
 this.authService.login(this.user).subscribe((data)=> {
 let jwToken = data.headers.get('Authorization');
 this.authService.saveToken(jwToken);
 this.authService.getUserFromDB(this.user.username).subscribe(user=>{
   this.authService.signIn(user);
   this.toastr.success('Bienvenue!');
 })
 window.location.reload();
 },(erreur)=>{ this.err = 1;
   this.toastr.error('Merci de verifier');
 });


 }

}
