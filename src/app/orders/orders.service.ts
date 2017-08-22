import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';
@Injectable()
export class OrdersService {

  constructor(private angularFire:AngularFire) { }

  getRecentOrders(){
    return this.angularFire.database.list("/Orders/recent");
  }
  getProcessingOrders(){
    return this.angularFire.database.list("/Orders/processing");
  }
  getCompletedOrders(){
    return this.angularFire.database.list("/Orders/completed");
  }

  getAllOrders(){
    /*let ordersRequest = this.angularFire.database.list("/Orders/recent");
    let processingRequest =this.angularFire.database.list("/Orders/processing");
    let completedRequest = this.angularFire.database.list("/Orders/completed");

    return Observable.forkJoin([ordersRequest,processingRequest,completedRequest]);*/
    return this.angularFire.database.list("/Orders/recent");
  }
  removeFromRecentOrders(order){
    let update;
    return this.angularFire.database.list("/Orders/recent").remove(order.$key);

  }
  removeFromProcessing(order){
    let update;
    return this.angularFire.database.list("/Orders/processing").remove(order.$key);
  }
  removeFromCompletedOrders(order){
    let update;
    return this.angularFire.database.list("/Orders/completed").remove(order.$key);
  }

  moveToProcessing(order){
    return this.angularFire.database.list("/Orders/processing").push(order);

  }

  moveToCompleted(order){
    return this.angularFire.database.list("/Orders/completed").push(order);

  }
}
