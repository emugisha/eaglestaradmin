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
      this.loginService.signin(this.auth)
        .then((result)=>{
          this.router.navigate([''])
      }).catch((error)=>{
        this.loginError = "Invalid username or Password";
      });
  }

}
