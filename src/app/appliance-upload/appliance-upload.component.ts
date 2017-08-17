import { Component, OnInit } from '@angular/core';
import {ApplianceUploadService} from "./appliance-upload.service";
import {Router} from "@angular/router";
import {Message} from 'primeng/primeng';

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
  private isLoading;
  public alertMsg: Message[] = [];
  constructor(private applianceUploadService:ApplianceUploadService, private router:Router) {
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
    let newKey = this.applianceUploadService.getApplianceNewKey();
    for(let i=0;i<this.filesToUpload.length;i++){
      this.uploadImages(this.filesToUpload[i],newKey,i);
    }
    /*this.applianceUploadService.uploadAppliance(this.appliance).then((data)=>{
      let id = data.key;
      for(let i=0;i<this.filesToUpload.length;i++){
        this.uploadImages(this.filesToUpload[i],id);
      }
    },(error)=>console.log('An error occurred'))
*/
  }

  uploadImages(image, newKey, imageName){
    this.isLoading = true;
    this.applianceUploadService.uploadImages(image, newKey, imageName).then((snapshot)=>{
      this.downloadUrls.push(snapshot.downloadURL);
      this.isUploadDone(newKey);
    },
      (error)=>{
      console.log('Error', error);
      this.isLoading =false;
        this.alertMsg.push({severity:'error', summary:'Error', detail:'Error in uploading the appliance! Please try again later.'});
      });
  }

  isUploadDone(newKey){
    if(this.downloadUrls.length == this.filesToUpload.length){
      this.appliance.imageUrls = this.downloadUrls;
      this.applianceUploadService.uploadAppliance(this.appliance,newKey ).then((data)=>{
        this.downloadUrls = [];
        this.appliance = {};
        this.isLoading = false;
        this.alertMsg.push({severity:'success', summary:'Success', detail:'The appliance was successfully uploaded! '});
        //this.router.navigate(['orders']);
      },error=>{
        this.isLoading =false;
        this.alertMsg.push({severity:'error', summary:'Error', detail:'Error in uploading the appliance! Please try again later.'});
      })
    }
  }

}
