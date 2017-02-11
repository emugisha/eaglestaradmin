import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RepairsComponent } from './repairs/repairs.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';
import {DataTableModule,SharedModule, DialogModule} from 'primeng/primeng';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import {LoginService} from "./login/login.service";
import {RouteGuard} from "./login/route-guard.service";
import { HomeDropDownDirective } from './home/home-drop-down.directive';
import {RepairService} from "./repairs/repair-service.service";

const appRoutes : Routes = [
  {path:'', pathMatch: 'full', redirectTo:'/repairs'},
  {path:'repairs', component:RepairsComponent, canActivate:[RouteGuard]},
  {path:'permissions',component:PermissionsComponent, canActivate:[RouteGuard]},
  {path:'login', component:LoginComponent}
];

const firebaseConfig = {
  apiKey: "AIzaSyBK9oL2UefOrdYpcxqJQDnfBRWTILJQgNA",
  authDomain: "eaglestaradmin.firebaseapp.com",
  databaseURL: "https://eaglestarrepairs.firebaseio.com",
  storageBucket: "eaglestarrepairs.appspot.com",
  messagingSenderId: "743157018706"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepairsComponent,
    PermissionsComponent,
    LoginComponent,
    HomeDropDownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    DataTableModule,
    DialogModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
  ],
  providers: [LoginService, RouteGuard,RepairService],
  bootstrap: [AppComponent]
})
export class AppModule { }
