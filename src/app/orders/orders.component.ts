import { Component, OnInit } from '@angular/core';
import {OrdersService} from "./orders.service";
import {Message} from "primeng/primeng";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private recentOrders = [];
  private processingOrders = [];
  private completedOrders = [];
  private viewDetails = false;
  private selectedOrder ={};
  private selectedOrderCategory;
  private selectedCartItem;
  private imageToDisplay;
  private displayImages;
  public alertMsg: Message[] = [];


  constructor(private orderService:OrdersService) { }

  ngOnInit() {
    this.orderService.getRecentOrders().subscribe(
      data=>this.recentOrders = data,
      (error)=> this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to retrieve recent orders'}));

    //Order in progresss
    this.orderService.getProcessingOrders().subscribe(
      data=>this.processingOrders = data,
      (error)=>this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to retrieve orders in progress'}));

    //Completed orders
    this.orderService.getCompletedOrders().subscribe(
      data=>this.completedOrders = data,
      (error)=>this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to retrieve completed orders'}));
  }

  showOrderDetails(order, category){
    this.selectedOrderCategory = category;
    this.selectedOrder = order;
    this.viewDetails = true;
  }
  showImages(item){
    this.displayImages = true;
    this.selectedCartItem = item;
    this.imageToDisplay = this.selectedCartItem.imageUrls[0];
  }
  acknowledgeOrder(selectedOrder){
    this.orderService.removeFromRecentOrders(selectedOrder).then(
      (success)=> {
        this.orderService.moveToProcessing(selectedOrder).then(
          (success) => {
            this.viewDetails = false;
            this.displayImages = false;
            this.alertMsg.push({severity:'success', summary:'Success', detail:'The order was successfully acknowledged'});
          },(error)=>{
            this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to acknowledge order. Please try again later.'});
          }
        );
      }).catch((error)=>console.log(error));
  }
  markAsDone(selectedOrder){
    if(this.selectedOrderCategory == 1){
      this.orderService.removeFromRecentOrders(selectedOrder).then(
        (success)=> {
          this.orderService.moveToCompleted(selectedOrder).then(
            (success) => {
              this.viewDetails = false;
              this.displayImages = false;
              this.alertMsg.push({severity:'success', summary:'Success', detail:'The order was successfully marked as completed.'});
            },(error)=>{
              this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to mark the order as completed. Please try again later.'})
            }
          );
        }).catch((error)=>console.log(error));
    }else{
      this.orderService.removeFromProcessing(selectedOrder).then(
        (success)=> {
          this.orderService.moveToCompleted(selectedOrder).then(
            (success) => {
              this.viewDetails = false;
              this.displayImages = false;
              this.alertMsg.push({severity:'success', summary:'Success', detail:'The appliance was successfully marked as completed.'});
            },(error)=>{
              this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to mark the order as completed. Please try again later.'})
            }
          );
        }).catch((error)=>console.log(error));
    }
  }
  deleteOrder(selectedOrder){
    if(this.selectedOrderCategory == 1){
      this.orderService.removeFromRecentOrders(selectedOrder).then(
        (success)=> {
          this.viewDetails = false;
          this.displayImages = false;
          this.alertMsg.push({severity:'success', summary:'Success', detail:'The order was successfully deleted.'});
        },error=>this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to delete the order. Please try again later.'}));

    }else if(this.selectedOrderCategory == 2){
      this.orderService.removeFromProcessing(selectedOrder).then(
        (success)=> {
          this.viewDetails = false;
          this.displayImages = false;
          this.alertMsg.push({severity:'success', summary:'Success', detail:'The order was successfully deleted.'});
        },(error)=>{
          this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to delete the order. Please try again later.'})
        });
    }else{
      this.orderService.removeFromCompletedOrders(selectedOrder).then(
        (success)=> {
          this.viewDetails = false;
          this.displayImages = false;
          this.alertMsg.push({severity:'success', summary:'Success', detail:'The order was successfully deleted.'});
        },error=>this.alertMsg.push({severity:'error', summary:'Error', detail:'Unable to delete the order. Please try again later.'}));
    }
  }
  close(){
    this.viewDetails = false;
    this.displayImages = false;
  }


}
