
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/model/role.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user = new User();
err:number = 0;
roles:Role[];
token:string='efjreongenge'
usernames:any[];
random:String;
  constructor(private authService:AuthService,
              private router:Router,
              private toastr: ToastrService,
              
               private formBuilder : FormBuilder,
              public userService:UserService
              ) {}
  ngOnInit(): void {
    
    this.userService.getRoleslist().subscribe((r:any[])=>{
      this.roles=r;
      console.log(r);
     });

     
     
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
    // signInHandler(): void {
    //   this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
    //     localStorage.setItem('google_auth', JSON.stringify(data));
    //     this.router.navigateByUrl('/verification').then();
    //     this.socialService.authState.subscribe((userSocial)=>{
    //       this.socialUser = userSocial;
    //       console.log(this.socialUser);       
    //     })
    //   });
    // }
  





  


}
