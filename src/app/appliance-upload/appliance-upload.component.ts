import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appliance-upload',
  templateUrl: './appliance-upload.component.html',
  styleUrls: ['./appliance-upload.component.css']
})
export class ApplianceUploadComponent implements OnInit {

  private filesToUpload;
  constructor() { }

  ngOnInit() {
  }

  private getFiles(event){
    console.log('files to upload');
    this.filesToUpload = event.files;
    console.log(this.filesToUpload);
  }

}
