import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompressImageService } from 'src/app/services/services/compress-image.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-create-article-collapse',
  templateUrl: './create-article-collapse.component.html',
  styleUrls: ['./create-article-collapse.component.css']
})
export class CreateArticleCollapseComponent implements OnInit {
  fileLength:number;
  userFile ;
  imgURL: any;
  public imagePath;
  public message: string;
  validImg:boolean=false;
  onSelect:boolean=false;
  ok:String='';
  constructor(
    public articleService:ArticleService,
    private router:Router,
    private formBuilder : FormBuilder,
    public authService : AuthService,
    private compressImage: CompressImageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.articleService.dataForm = this.formBuilder.group({
      title:'',
      text:'',
      dateCreation:Date.now(),
      user:this.authService.loggedUser,
    })
  }

  insertArticle(){
    if (!this.imagePath){
      const formData = new FormData();
      const user = this.articleService.dataForm.value;
      formData.append('article',JSON.stringify(user));
     // formData.append('file',this.userFile);
      this.articleService.createData(formData).subscribe(data=>{
        console.log(data);
        window.location.reload();
      });
    
     }
  
     else{
      const formData = new FormData();
      const user = this.articleService.dataForm.value;
      formData.append('article',JSON.stringify(user));
      formData.append('file',this.userFile);
      this.articleService.createDataWithImg(formData).subscribe(data=>{
        console.log(data);
        window.location.reload();
      });
     
     }
     
    }

  onSelectFile(event) {
    this.fileLength = event.target.files.length;
    if (this.fileLength > 0)
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



}
