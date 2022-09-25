import { Cart } from "./cart.model";
import { Delegation } from "./delegation.model";
import { Panier } from "./panier.model";
import { User } from "./user.model";

export class Cmd{
    id :number;
    user: User;
    delegation: Delegation;
    dateCreation:Date;
    qty:number;
    livraison:string;
    carts:Cart[];
    paniers:Panier[];
    address :string;
    prixCommande:number;

}