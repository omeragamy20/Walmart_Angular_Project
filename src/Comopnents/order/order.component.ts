import { Component, OnInit } from '@angular/core';
import { SummeryComponent } from '../summery/summery.component';
import { OrderitemsComponent } from "../orderitems/orderitems.component";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderComponent, SummeryComponent, OrderitemsComponent, OrderitemsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  num: any;
  timee: Date | any;
  Month: Date | any;
  Day: Date | any;
  constructor(private coockies: CookieService) {


  }
  ngOnInit(): void {

    this.count();
    this.datee();


  }



  count() {

    let all = localStorage.getItem("SelectedProducts");
    let prod = all ? JSON.parse(all) : []

    this.num = prod.length

  }


  datee() {

    let timee = new Date();
    timee.setDate(timee.getDate() + 3)

    this.Day = timee.toLocaleString('default', { weekday: 'long' })
    this.Month = timee.toLocaleString('default', { month: 'long' })



  }



}
