import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../model/article.model';
import { Cart } from '../model/cart.model';
import { Message } from '../model/message.model';
import { Produit } from '../model/produit.model';
import { User } from '../model/user.model';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { MessageService } from '../services/message.service';
import { ProduitService } from '../services/produit.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  term;
  articles:Article[];
  isLoading:boolean = false;
  errTXT:string='';
  user:User;
  produits:Produit[];
  pic: Boolean;
  idCarts:string="idCarts";
  idCartsCmd:string="idCartsCmd";
  carts:Cart[];
  cartsCmd:Cart[];
  username:string;
  messages:Message[];
  form!:FormGroup;
  initialText: string = '';
  lastMsg:Message[];
  constructor(
    public userService: UserService,
    public authService: AuthService,
    private activatedRoute:ActivatedRoute,
    public produitService:ProduitService,
    private cartService:CartService,
    public messageService:MessageService,
    private toastr: ToastrService,
    public articleService:ArticleService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params.user_id).
    subscribe( u =>{
      this.user=u;
      this.username=u.username;  
      this.CartCmd(this.username);
      this.CartenCours(this.username);  
      this.initData();
      this.messageService.getByEmiteur(this.username).subscribe(m=>{
this.messages = m;
      })
  });
  this.produitService.listeProduitsByUser(this.activatedRoute.snapshot.params.user_id).subscribe(p=>{
    this.produits=p;
  });
  
  }
  CartenCours(username:string){
    this.cartService.getByUsernameEnCours(username).subscribe(data=>{
      this.carts=data;
      console.log(this.carts);
          });
  
  }
  CartCmd(username:string){
   this.cartService.getByUsernameEnCommade(username).subscribe(d=>{
      this.cartsCmd=d;
      console.log(this.cartsCmd);
       });  
       this.articleService.listeArticlesByUser(this.authService.loggedUser).subscribe(a=>{
        this.articles=a;
      })    
      
  }
  
  onSubmit(){
    const formData = new FormData();
    const message = this.messageService.dataForm.value;
    formData.append('message',JSON.stringify(message));
  
    this.messageService.message(formData).toPromise().then(data=>{
      console.log(data);  
      this.toastr.success('Message envoyé!');
      this.messages = [...this.messages, data];
     }
    ) 
    .catch(()=>this.errTXT="msg d'erreur").finally(()=>{
      
    });
  }
  
  initData(){
    
      this.messageService.dataForm = this.formBuilder.group({
        auteur:new FormControl(this.authService.loggedUser), 
        emiter:new FormControl(this.user.user_id),
        message:new FormControl(""),
        dateCreation:new FormControl(new Date()),
          });
  
  }
scroll(){
  window.scrollTo(0, 0);
}
onActivate(event) {
  // window.scroll(0,0);

  window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
   });

   //or document.body.scrollTop = 0;
   //or document.querySelector('body').scrollTo(0,0)
  
}
}
