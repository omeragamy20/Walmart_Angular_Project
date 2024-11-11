import { Component, DoCheck, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShapMentViewComponent } from '../shap-ment-view/shap-ment-view.component';
import { OrderComponent } from '../order/order.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-summery',
  standalone: true,
  imports: [RouterLink, ShapMentViewComponent, OrderComponent, SummeryComponent,TranslateModule],
  templateUrl: './summery.component.html',
  styleUrl: './summery.component.css'
})
export class SummeryComponent implements OnInit, DoCheck {
  ngDoCheck(): void {
    this.getprice();
  }
  totalprice: number = 0

  ngOnInit(): void {
    this.getprice()
  }


  getprice() {

    let item = localStorage.getItem("SelectedProducts")
    let prod = item ? JSON.parse(item) : []
    let total = 0;
    if (Array.isArray(prod)) {

      for (let i = 0; i < prod.length; i++) {

        total += prod[i].price * prod[i].quantity

      }

    }
    this.totalprice = total;


  }











}
