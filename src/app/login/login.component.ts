import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth:any ={};
  loginError = null;

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }
  login(){
    console.log(this.auth);
      this.loginService.signin(this.auth)
        .then((result)=>{
          console.log('loggedIn');
          this.router.navigate(['repairs']);
      }).catch((error)=>{
        console.log(error);
        this.loginError = "Invalid username or Password";
      });
  }

}
