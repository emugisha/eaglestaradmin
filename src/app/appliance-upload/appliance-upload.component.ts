import { Component, OnInit } from '@angular/core';
import {ApplianceUploadService} from "./appliance-upload.service";

@Component({
  selector: 'app-appliance-upload',
  templateUrl: './appliance-upload.component.html',
  styleUrls: ['./appliance-upload.component.css']
})
export class ApplianceUploadComponent implements OnInit {

  private filesToUpload:File [] = [];
  private uploadButton = false;
  private appliance;
  private downloadUrls = [];
  constructor(private applianceUploadService:ApplianceUploadService) {
    this.appliance = {};
  }

  ngOnInit() {
  }

  private getFiles(event){
    console.log('files to upload', event.files);
    for(let i=0;i<event.files.length;i++){
      this.filesToUpload.push(event.files[i]);
    }
    console.log(this.filesToUpload);
  }

  uploadItems(){
    this.applianceUploadService.uploadAppliance(this.appliance).then((data)=>{
      let id = data.key;
      for(let i=0;i<this.filesToUpload.length;i++){
        this.uploadImages(this.filesToUpload[i],id);
      }
    },(error)=>console.log('An error occurred'))

  }

  uploadImages(image, id){
    this.applianceUploadService.uploadImages(image, image.name).then((snapshot)=>{
      this.downloadUrls.push()
    });
  }

}
