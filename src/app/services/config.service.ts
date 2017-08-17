import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class ConfigService {

  constructor() { }

  initializeFirebase(){
    const config = {
      apiKey: "AIzaSyBK9oL2UefOrdYpcxqJQDnfBRWTILJQgNA",
      authDomain: "eaglestaradmin.firebaseapp.com",
      databaseURL: "https://eaglestarrepairs.firebaseio.com",
      storageBucket: "eaglestarrepairs.appspot.com",
      messagingSenderId: "743157018706"
    };

    firebase.initializeApp(config);
  }

  getFirebaseAuth(){
    return firebase.auth();
  }

  getFirebaseDatabase(){
    return firebase.database();
  }

  getFirebaseStorage(){
    return firebase.storage();
  }

}
