import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-shapementsummery',
  standalone: true,
  imports: [],
  templateUrl: './shapementsummery.component.html',
  styleUrl: './shapementsummery.component.css'
})
export class ShapementsummeryComponent implements OnInit, DoCheck {
  num: any;
  totalprice: number = 0
  ngDoCheck(): void {
    this.getprice();
    this.count();
  }
  ngOnInit(): void {
    this.getprice()
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
