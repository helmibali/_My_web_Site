import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-carroussel',
  templateUrl: './carroussel.component.html',
  styleUrls: ['./carroussel.component.css']
})
export class CarrousselComponent implements OnInit {
  user:User;
  constructor(private router:Router,
    private userService:UserService,
    private authService: AuthService ) { }

  ngOnInit(): void {
      
    this.userService.getUserByUsername(this.authService.loggedUser).subscribe(u=>{
      this.user=u;
     
    })
  }
  viewProfile(){
    this.router.navigate(['/mon-compte',this.user.user_id]).then(()=> {
      window.location.reload();
    });
  }
}
