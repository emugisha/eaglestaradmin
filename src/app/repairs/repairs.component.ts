import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.css']
})
export class RepairsComponent implements OnInit{

  newBooking = [];
  constructor() { }
  ngOnInit() {
    this.newBooking[0] ={name:'Mr Bean England', city:'Silver Spring', zipCode:'20910', phone:'345-234-3456', availability:'12:45-12:34'};
    this.newBooking[1] ={name:'Tekno Miles', city:'Rosslyn', zipCode:'20910', phone:'345-234-3456', availability:'2:00-12:9'}
  }
  

}
