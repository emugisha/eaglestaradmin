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
  viewDetails = false;
  selectedBooking={};
  private showAcknowledge;
  private showMarkAsDone;
  private selectedTable;

  constructor(private repairService:RepairService) { }
  ngOnInit() {
    this.repairService.getRecentBookings().subscribe(
      bookings =>{
        this.newBookings = bookings;
      },
      error=>{console.log("Error Occured");}
    );

    this.repairService.getInProgressBookings().subscribe(
      inProgress =>{
        console.log(inProgress);
        this.inProgressBookings = inProgress;
      },
      error=>{console.log("Error Occured");}
    );
    this.repairService.getCompletedBookings().subscribe(
      completed =>{
        this.completedBookings = completed;
      },
      error=>{console.log("Error Occured");}
    );

    //this.newBooking[0] ={name:'Mr Bean England', city:'Silver Spring', zipCode:'20910', phone:'345-234-3456', availability:'12:45-12:34'};
   // this.newBooking[1] ={name:'Tekno Miles', city:'Rosslyn', zipCode:'20910', phone:'345-234-3456', availability:'2:00-12:9'}
  }

  showMoreDetails(booking, table){
    this.selectedTable = table;
    if(table=='1'){
      this.selectedBooking = booking;
      this.viewDetails = true;
      this.showAcknowledge = true;
      this.showMarkAsDone = true;
    }else if(table == '2'){
      this.selectedBooking = booking;
      this.showAcknowledge = false;
      this.viewDetails = true;
      this.showMarkAsDone = true;

    }else if(table == '3'){
      this.selectedBooking = booking;
      this.viewDetails = true;
      this.showAcknowledge = false;
      this.showMarkAsDone = false;

    }
  }
  acknowledge(booking){
    this.repairService.removeFromNewBookings(booking).then(
      (success)=> {
        this.repairService.moveToInProgress(booking).then(
          (success) => {
            this.viewDetails = false;
          },(error)=>{
            console.log(error);
          }
        );
      }).catch((error)=>console.log(error));
  }
  markAsDone(booking){
    if(this.selectedTable =='1'){
      this.repairService.removeFromNewBookings(booking).then(
        (success)=> {
          this.repairService.moveToCompleted(booking).then(
            (success) => {
              this.viewDetails = false;
            },(error)=>{
              console.log(error);
            }
          );
        }).catch((error)=>console.log(error));
    }else{
      this.repairService.removeFromInProgressBookings(booking).then(
        (success)=> {
          this.repairService.moveToCompleted(booking).then(
            (success) => {
              this.viewDetails = false;
            },(error)=>{
              console.log(error);
            }
          );
        }).catch((error)=>console.log(error));
    }

  }
  delete(booking){
    if(this.selectedTable == '1'){
      this.repairService.removeFromNewBookings(booking).then(
        (success)=> {
          this.viewDetails = false;
        });

    }else if(this.selectedTable =='2'){
      this.repairService.removeFromInProgressBookings(booking).then(
        (success)=> {
          this.viewDetails = false;
        });
    }else{
      this.repairService.removeFromCompletedBookings(booking).then(
        (success)=> {
          this.viewDetails = false;
        });
    }

  }
  close(){
    this.viewDetails = false;
  }

}
