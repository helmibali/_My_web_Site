import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  @Input()
  term;
  user:User;
  constructor(
    public authService:AuthService,
    private router:Router,
    public userService: UserService,
  ) { }

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
