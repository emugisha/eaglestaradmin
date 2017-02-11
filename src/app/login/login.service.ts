import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {
  user:any;
  constructor(private angularFire: AngularFire, private router:Router) { }

  signin(user){
    console.log(user);
    return this.angularFire.auth
        .login({email: user.email, password:user.pswd});
  }

  signout(){
    this.angularFire.auth.logout();
    return Promise.resolve();
  }

  getCurrentUser(){
    this.angularFire.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        return this.user;
      }
      else {
        // user not logged in
        this.user = {};
        return this.user;
      }
    });
  }

  isAuthenticated():boolean{
    let auth = false;
    this.angularFire.auth.subscribe(user => {
      if(user) {
        auth = true;
      }
      else {
        // user not logged in
        auth = false;
      }
    }, error => {auth = false;});

    return auth;
  }


}
