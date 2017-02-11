import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable()
export class RouteGuard implements CanActivate{

  constructor(private loginService:LoginService, private router:Router) { }

  canActivate(){
    let isAuthenticated:boolean = this.loginService.isAuthenticated();
    console.log("Checking logging .....");
    //Redirect to login
    if(!isAuthenticated){
      console.log("Not loggein in");
      this.router.navigate(['login']);
    }
    return isAuthenticated;
  }
}
