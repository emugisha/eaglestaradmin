import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class ApplianceUploadService {

  private storageRef;

  constructor(private angularFire:AngularFire) {
    this.storageRef = firebase.storage().ref('appliances');
  }

   uploadAppliance(appliance){
    return this.angularFire.database.list("appliances").push(appliance);
   }

   uploadImages(file,fileName){
     return this.storageRef.child(fileName).put(file);
   }

}
