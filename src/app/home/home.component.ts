import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'esr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isVisible;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  showAccountLink(){
    return this.loginService.isAuthenticated();
  }

  logout(){
    this.loginService.signout().then(
      (success)=>{
        this.router.navigate(['login']);
      }
    );
  }
}
