import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Delegation } from 'src/app/model/delegation.model';
import { Gouvernorat } from 'src/app/model/gouvernorat.model';
import { Role } from 'src/app/model/role.model';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { DelegationService } from 'src/app/services/delegation.service';
import { GouvernoratService } from 'src/app/services/gouvernorat.service';
import { UserService } from 'src/app/services/user.service';
import {  GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Location } from '@angular/common';
import { CompressImageService } from 'src/app/services/services/compress-image.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  dropdownSettings;
  role:Role;
  roles:Role[];
  userFile ;
  validImg:boolean=false;
  onSelect:boolean=false;
  ok:String='';
  socialUser: SocialUser;
  selectedGouvernorat: any={id:0,  libelle:''};
  selectedRoles:Role[]=[{id:2,role:'USER'}];
  imgURL: any;
  public imagePath;
  public message: string;
  gouvernorats:Gouvernorat[];
  delegations:Delegation[];
  constructor(
    public userService: UserService,
    public fb:FormBuilder,
    private _location: Location,
    private router: Router,
    private gouvernoratService : GouvernoratService,
    private delegationService : DelegationService,
    private customValidator : CustomValidationService,
    private socialService: SocialAuthService,
    private toastr: ToastrService,
    private compressImage: CompressImageService

  ) { }
  infoForm(){
    this.userService.dataForm = this.fb.group({
      
      // id: null,
      prenom:new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ]),
      nom:new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ]),
      
      telephone:new FormControl('',[
        Validators.required,
        Validators.minLength(8)
      ]),
      username: [
        "",
        [Validators.required, Validators.minLength(3),Validators.email],
        this.customValidator.validateUsernameNotTaken.bind(this.customValidator)
      ],
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
    
      ]),
      delegation_id:new FormControl('',[
        Validators.required
      ]),
      roles:[],
      enabled:true
      },
      { validators: this.checkPasswords });
  }
  get prenom() { return this.userService.dataForm.get('prenom') }
  get nom() { return this.userService.dataForm.get('nom') }
  get username() { return this.userService.dataForm.get('username') }
  get telephone() { return this.userService.dataForm.get('telephone') }
  get password() { return this.userService.dataForm.get('password') }
  get repassword() { return this.userService.dataForm.get('repassword') }
  get delegation_id() { return this.userService.dataForm.get('delegation_id') }
  ngOnInit(): void {
    this.infoForm();
    this.gouvernoratService.listeGouvernorats().subscribe(g=>{
      this.gouvernorats=g;
    });
    this.userService.getRoleslist().subscribe((r:any[])=>{
      this.roles=r;
      //console.log(r);
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'role',
      selectAllText: 'Selectioner tout',
      unSelectAllText: 'déselectioner tout'
    };

  }
  addData(){
    if (!this.imagePath){
      const formData = new FormData();
    const user = this.userService.dataForm.value;
    formData.append('user',JSON.stringify(user));
   // formData.append('file',this.userFile);
    this.userService.createData(formData).subscribe(data=>{
      console.log(data);
      window.location.reload();
    });
   }

   else{
    const formData = new FormData();
    const user = this.userService.dataForm.value;
    formData.append('user',JSON.stringify(user));
    formData.append('file',this.userFile);
    this.userService.createDataWithFile(formData).subscribe(data=>{
      console.log(data);
      
      this.router.navigate(['/login']).then(()=> {
       
        window.location.reload();
        
      },
      );
       this.toastr.success('Vous etes inscrit!'); 
    });
   }
   
  }

  onSelectGov(e){
    console.log(e.target.value);
    this.delegationService.ListDelegationByGouvernourat_id(e.target.value).subscribe(data=>{
      this.delegations = data;
      
    });
    this.selectedGouvernorat.id = e.target.value;
  }

  

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.compressImage.compress(file)
      .pipe(take(1))
      .subscribe(compressedImage => {
        console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
        // now you can do upload the compressed image 
        this.userFile =compressedImage  ;
      })
      this.onSelect=true;
  
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }  
}

validateImg(){
 
  this.validImg=true;
  console.log(this.validImg);
  this.ok = 'Votre choix est valide';
}
onItemSelect($event){
  console.log('$event is ', $event); 
}
getObjectListFromData(ids){
  return this.roles.filter(item => ids.includes(item.id))
}


signInHandler(): void {
  this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
    localStorage.setItem('google_auth', JSON.stringify(data));
    this.router.navigateByUrl('/inscription-social').then();
    this.socialService.authState.subscribe((userSocial)=>{
      this.socialUser = userSocial;
      console.log(this.socialUser);
      
    })
  });
}

checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  let pass = group.get('password').value;
  let confirmPass = group.get('repassword').value
  return pass === confirmPass ? null : { notSame: true }
}
backClicked() {
  this._location.back();
}
}