import { Injectable } from '@angular/core';
import {ConfigService} from "../services/config.service";

@Injectable()
export class ApplianceUploadService {

  private storageRef;
  private appliancesRef;

  constructor(private configService:ConfigService) {
    this.appliancesRef = this.configService.getFirebaseDatabase().ref('appliances');
    this.storageRef = configService.getFirebaseStorage().ref('appliances');
  }

   uploadAppliance(appliance, newKey){
    return this.appliancesRef.child('/'+newKey).set(appliance);
   }

   getApplianceNewKey(){
     return this.appliancesRef.push().key;
   }

   uploadImages(file,fileName,imageName){
     return this.storageRef.child(fileName +'/'+imageName+'.jpg').put(file);
   }

}
