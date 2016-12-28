import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {PanelModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RepairsComponent } from './repairs/repairs.component';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';


const appRoutes : Routes = [
  {path:'', component:RepairsComponent},
  {path:'permissions',component:PermissionsComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepairsComponent,
    PermissionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    PanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
