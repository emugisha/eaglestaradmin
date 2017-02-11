import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class RepairService {

  constructor(private angularFire:AngularFire) { }

  getRecentBookings(){
    return this.angularFire.database.list("/Bookings/NewBookings");
  }
  getInProgressBookings(){
    return this.angularFire.database.list("/Bookings/InProgress");
  }
  getCompletedBookings(){
    return this.angularFire.database.list("/Bookings/Completed");
  }

  removeFromNewBookings(booking){
    let update;
    return this.angularFire.database.list("/Bookings/NewBookings/").remove(booking.$key);

  }
  removeFromInProgressBookings(booking){
    let update;
    return this.angularFire.database.list("/Bookings/InProgress/").remove(booking.$key);
  }
  removeFromCompletedBookings(booking){
    let update;
    return this.angularFire.database.list("/Bookings/Completed/").remove(booking.$key);
  }


  moveToInProgress(booking){
      return this.angularFire.database.list("/Bookings/InProgress").push({appliance:booking.appliance,availability:booking.availability || '',
        clientDetails:booking.clientDetails || ''});

  }

  moveToCompleted(booking){
    return this.angularFire.database.list("/Bookings/Completed").push({appliance:booking.appliance,availability:booking.availability || '',
      clientDetails:booking.clientDetails || ''});

  }

}
