import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShapementsummeryComponent } from '../shapementsummery/shapementsummery.component';
import { OrderitemsComponent } from '../orderitems/orderitems.component';
import { OrderShapmentfooterComponent } from '../order-shapmentfooter/order-shapmentfooter.component';
import { PaypaylcomponintComponent } from '../paypaylcomponint/paypaylcomponint.component';

@Component({
  selector: 'app-orderview',
  standalone: true,
  imports: [RouterLink, ShapementsummeryComponent, OrderitemsComponent, OrderShapmentfooterComponent,PaypaylcomponintComponent],
  templateUrl: './orderview.component.html',
  styleUrl: './orderview.component.css'
})
export class OrderviewComponent implements OnInit {

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