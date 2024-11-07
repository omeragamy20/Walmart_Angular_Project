import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { OrderitemsComponent } from '../orderitems/orderitems.component';
import { SummeryComponent } from '../summery/summery.component';
import { ShapementsummeryComponent } from '../shapementsummery/shapementsummery.component';

@Component({
  selector: 'app-shap-ment-view',
  standalone: true,
  imports: [RouterLink, OrderitemsComponent, SummeryComponent, ShapMentViewComponent, OrderComponent, RouterOutlet, ShapementsummeryComponent],
  templateUrl: './shap-ment-view.component.html',
  styleUrl: './shap-ment-view.component.css'
})
export class ShapMentViewComponent implements OnInit {

  num: any;
  timee: Date | any;
  Month: Date | any;
  Day: Date | any;


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
