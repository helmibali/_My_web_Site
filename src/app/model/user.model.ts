import { Delegation } from "./delegation.model";
import { Role } from "./role.model";

export class User {
    resetPasswordToken:string;
    token:string;
    user_id:number;
    username:string;
    password:string;
    nom:string;
    prenom:string;
    naissance:Date;
    roles!:Role[];
    delegation:Delegation;
    telephone:string;
    filename:string;
    photoUrl:string;
    enabled:boolean;
}