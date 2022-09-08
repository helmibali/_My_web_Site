import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'cartinCmd',
  templateUrl: './liste-cart-cmd.component.html',
  styleUrls: ['./liste-cart-cmd.component.css']
})
export class ListeCartCmdComponent implements OnInit {
  @Input()
  cartsCmd!:Cart[];
  user_id:number;
  constructor(
    private cartService:CartService,
    private authService:AuthService,
    private router : Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }
 toProfile(user_id:number){
  
  this.router.navigate(['/profile',user_id]).then(()=> {
    window.location.reload();
  });
 }
}
