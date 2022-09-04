import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password-forgot',
  templateUrl: './reset-password-forgot.component.html',
  styleUrls: ['./reset-password-forgot.component.css']
})
export class ResetPasswordForgotComponent implements OnInit {
  user:User;
  constructor(
    public userService: UserService,
    private router: Router,
    private activatedRoute :ActivatedRoute,
    public authService :AuthService,
    private formBuilder:FormBuilder,
  ) {
    this.userService.dataForm = this.formBuilder.group(
      {
       password: new FormControl('',[
         Validators.required,
         Validators.minLength(6)
       ])
      } 
     )
   }
  
   get password() { return this.userService.dataForm.get('password') }
   get repassword() { return this.userService.dataForm.get('repassword') }
  ngOnInit(): void {
    this.userService.getUserByToken(this.activatedRoute.snapshot.params.token)
    .subscribe(u =>{
      this.user=u;
      this.userService.dataForm = new FormGroup(
        {
          password: new FormControl('',[
            Validators.required,
            Validators.minLength(6)
          ]),
          repassword: new FormControl('',[
            Validators.required,
          ])
        }
      ) 
    })
  }

  onClick(){
  
    const formData = new FormData();
    let user = this.userService.dataForm.value;
    
    formData.append('user',JSON.stringify(user));
    console.log(user)
  
    this.userService.updatePwEmail(formData,this.user.user_id).subscribe(data=>{
      console.log(data);
      
      alert("votre mot de passe a été modifié avec succès");
      this.router.navigate(['/login']);
      
    });
  }

}
