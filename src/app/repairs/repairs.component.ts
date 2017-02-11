import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {RepairService} from "./repair-service.service";


@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit{

  newBookings = [];
  inProgressBookings=[];
  completedBookings=[];
  firstBooking;
  viewDetails = false;
  selectedBooking={};
  constructor(private repairService:RepairService) { }
  ngOnInit() {
    this.repairService.getRecentBookings().subscribe(
      bookings =>{
        this.newBookings = bookings;
        console.log(this.newBookings);
        this.firstBooking = this.newBookings[0];
      },
      error=>{console.log("Error Occured");}
        );

    //this.newBooking[0] ={name:'Mr Bean England', city:'Silver Spring', zipCode:'20910', phone:'345-234-3456', availability:'12:45-12:34'};
   // this.newBooking[1] ={name:'Tekno Miles', city:'Rosslyn', zipCode:'20910', phone:'345-234-3456', availability:'2:00-12:9'}
  }

  showMoreDetails(index){
    this.viewDetails = true;
    this.selectedBooking = this.newBookings[index];
  }
  acknowledge(){

  }
  markAsDone(){

  }
  delete(){

  }
  close(){
    this.viewDetails = false;
  }

}
