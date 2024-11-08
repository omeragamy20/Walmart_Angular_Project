import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShapementsummeryComponent } from '../shapementsummery/shapementsummery.component';
import { OrderitemsComponent } from '../orderitems/orderitems.component';
import { OrderShapmentfooterComponent } from '../order-shapmentfooter/order-shapmentfooter.component';
import { OrderService } from '../../Services/Order/order.service';
import { Order } from '../../InterFaces/order';
import { OrderItems } from '../../InterFaces/order-items';

@Component({
  selector: 'app-orderview',
  standalone: true,
  imports: [RouterLink, ShapementsummeryComponent, OrderitemsComponent, OrderShapmentfooterComponent,PaypaylcomponintComponent],
  templateUrl: './orderview.component.html',
  styleUrl: './orderview.component.css'
})
export class OrderviewComponent implements OnInit {

  order: Order = {} as Order

  constructor(private orderservice: OrderService) {


  }


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




  Createorder() {
    this.order.orderItems = [];

    let all = localStorage.getItem("SelectedProducts");
    let prod = all ? JSON.parse(all) : []
    let many = 0

    if (Array.isArray(prod)) {
      for (let i = 0; i < prod.length; i++) {

        many += prod[i].quantity ? prod[i].quantity : 0

        let include = prod[i]

        let orderitem: OrderItems = {} as OrderItems

        orderitem.productId = include.id
        orderitem.quantity = include.quantity
        orderitem.price = include.quantity * include.price
        this.order.orderItems.push(orderitem)

      }
    }


    this.order.totalPrice = many

    console.log(this.order);



    this.orderservice.CreateOrder(this.order).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }





}
