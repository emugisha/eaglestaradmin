import { Component, OnInit } from '@angular/core';
import {OrdersService} from "./orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private recentOrders = [];
  private processingOrders = [];
  private completedOrders = [];

  constructor(private orderService:OrdersService) { }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(
      (data)=>{
        this.recentOrders = data;
        /*this.recentOrders = data[0];
        this.processingOrders = data[1];
        this.completedOrders = data[2];*/
        console.log('Inside orders component');
        console.log(this.recentOrders);
        },
      (error)=>console.log("Unable to retrieve recent orders."));

  }

}
