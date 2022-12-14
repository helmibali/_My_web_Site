import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MarqueService } from 'src/app/services/marque.service';

import { CompressImageService } from 'src/app/services/services/compress-image.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.css']
})
export class AddMarqueComponent implements OnInit {
 //-----------------------------------//
  file: any;
  predictions: number[];
  imageDataEvent: any;
  localUrl: any;
  localCompressedURl:any;
  isFlip: boolean = false;
  sizeOfOriginalImage:number;
  sizeOFCompressedImage:number;
  //-----------------------------------//

  public imagePath;
  imgURL: any;
  userFile ;
  public message: string;
  constructor(public marqueService : MarqueService,
    public fb:FormBuilder,
    private router:Router,
    private compressImage: CompressImageService
    ) { }

    infoForm(){
      this.marqueService.dataForm = this.fb.group({
        id: null,
        libelleMarque:[''],
        });
    }
    addData(){
      const formData = new FormData();
      const marque = this.marqueService.dataForm.value;
      formData.append('marque',JSON.stringify(marque));
      formData.append('file',this.userFile);
      this.marqueService.createData(formData).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/marques']);
      });
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
  
 

    //-------------------------------//
  
    
  

  ngOnInit(): void {
    this.infoForm()
  }

}
