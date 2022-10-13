import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cart } from "src/app/model/cart.model";

@Component({
  selector: "cartinCmd",
  templateUrl: "./liste-cart-cmd.component.html",
  styleUrls: ["./liste-cart-cmd.component.css"],
})
export class ListeCartCmdComponent implements OnInit {
  @Input()
  cartsCmd!: Cart[];
  user_id: number;
  constructor(private router: Router) {}

  ngOnInit(): void {}
  toProfile(user_id: number) {
    this.router.navigate(["/profile", user_id]).then(() => {
      window.location.reload();
    });
  }
}
