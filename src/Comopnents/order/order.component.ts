import { Component, DoCheck, OnInit } from '@angular/core';
// import { SummeryComponent } from '../summery/summery.component';
// import { OrderitemsComponent } from "../orderitems/orderitems.component";
import { CookieService } from 'ngx-cookie-service';
import { ShapMentViewComponent } from '../shap-ment-view/shap-ment-view.component';
import { SummeryComponent } from '../summery/summery.component';
import { OrderitemsComponent } from '../orderitems/orderitems.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OrderComponent, SummeryComponent, OrderitemsComponent, OrderitemsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, DoCheck {
  num: any;
  timee: Date | any;
  Month: Date | any;
  Day: Date | any;
  constructor(private coockies: CookieService) {


  }
  ngDoCheck(): void {
    this.count();
  }
  ngOnInit(): void {

    this.count();
    this.datee();

  }


  count() {

    let all = localStorage.getItem("SelectedProducts");
    let prod = all ? JSON.parse(all) : []
    let many = 0
    if (Array.isArray(prod)) {
      for (let i = 0; i < prod.length; i++) {
        many += prod[i].quantity ? prod[i].quantity : 0
      }
    }
    this.num = many

  }


  datee() {

    let timee = new Date();
    timee.setDate(timee.getDate() + 3)

    this.Day = timee.toLocaleString('default', { weekday: 'long' })
    this.Month = timee.toLocaleString('default', { month: 'long' })


  }
}
