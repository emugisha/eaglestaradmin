import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";

@Injectable()
export class RepairService {

  constructor(private angularFire:AngularFire) { }

  getRecentBookings(){
    return this.angularFire.database.list("/Bookings/NewBookings");
  }
}
