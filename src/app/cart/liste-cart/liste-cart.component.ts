import { Component, Input, OnInit, SimpleChange } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Cart } from "src/app/model/cart.model";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-liste-cart",
  templateUrl: "./liste-cart.component.html",
  styleUrls: ["./liste-cart.component.css"],
})
export class ListeCartComponent implements OnInit {
  @Input()
  carts: Cart[];
  @Input()
  id!: String;

  user_id: number;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toProfile(user_id: number) {
    this.router.navigate(["/profile", user_id]).then(() => {
      window.location.reload();
    });
  }
}
