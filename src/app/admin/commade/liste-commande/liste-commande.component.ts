import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Commande } from 'src/app/model/commande.model';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {
commandes:Commande[];
p:number=1;
  constructor(public commandeService:CommandeService,
    public authService: AuthService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.init1();
    this.init2();
this.commandeService.getAll().subscribe(c=>{
  this.commandes=c;
  //console.log(c);
})
  }

  init1(){
    this.commandeService.dataForm = this.formBuilder.group({
      validation: true,
      annulation:false,
    })
  }
  init2(){
    this.commandeService.activeForm = this.formBuilder.group({
      validation: false,
      annulation:true,
    })
  }


  annuler(c:Commande){
    const formData = new FormData();
    const commande = this.commandeService.activeForm.value;
    formData.append('commande',JSON.stringify(commande));
     
    this.commandeService.validate(formData,c.id).subscribe((data)=>{
      // console.log(data);
    });
    //this.router.navigate(['produits']).then(()=> {
        window.location.reload();
    
   }

   valider(c:Commande){
    const formData = new FormData();
    const commande = this.commandeService.dataForm.value;
    formData.append('commande',JSON.stringify(commande));
     
    this.commandeService.validate(formData,c.id).subscribe((data)=>{
      // console.log(data);
    });
  //  this.router.navigate(['produits']).then(()=> {
       window.location.reload();
   // });
   }

}
