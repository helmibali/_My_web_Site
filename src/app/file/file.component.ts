import { Component, OnInit } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { take } from 'rxjs/operators';
import { CompressImageService } from '../services/services/compress-image.service';
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  constructor(private imageCompress: NgxImageCompressService,
    private compressImage: CompressImageService) { }
imagec:any;
public imagePath;
  imgURL: any;
  userFile ;
  
  ngOnInit() {
  }

//   onSelectFile(event) {
//     if (event.target.files.length > 0)
//     {
//       const file = event.target.files[0];
//       this.userFile = file;
  
 
//     var mimeType = event.target.files[0].type;
//     if (mimeType.match(/image\/*/) == null) {
//       this.message = "Only images are supported.";
//       return;
//     }
 
//     var reader = new FileReader();
    
//     this.imagePath = file;
//     reader.readAsDataURL(file); 
//     reader.onload = (_event) => { 
//       this.imgURL = reader.result; 
//     }
//   }  
// }
upload(event) {
  let image: File = event.target.files[0]
  console.log(`Image size before compressed: ${image.size} bytes.`)
   
  this.compressImage.compress(image)
    .pipe(take(1))
    .subscribe(compressedImage => {
      console.log(`Image size after compressed: ${compressedImage.size} bytes.`);
      this.imagec=image;
      // now you can do upload the compressed image 
      var reader = new FileReader();
      
      this.imagePath = compressedImage;
      reader.readAsDataURL(image); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result;
      }
    })
}
}

