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
  imports: [RouterLink, ShapementsummeryComponent, OrderitemsComponent, OrderShapmentfooterComponent],
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
    this.order.OrderItems = [];

    let all = localStorage.getItem("SelectedProducts");
    let prod = all ? JSON.parse(all) : []
    let many = 0

    if (Array.isArray(prod)) {
      for (let i = 0; i < prod.length; i++) {

        many += prod[i].quantity ? prod[i].quantity : 0

        let include = prod[i]

        let orderitem: OrderItems = {} as OrderItems

        if (this.order.Id) {
          orderitem.OrderId = this.order.Id;  // Set OrderId here before sending to backend
        }
        orderitem.ProductId = include.id
        orderitem.Quantity = include.quantity
        orderitem.Price = include.quantity * include.price


        this.order.OrderItems.push(orderitem)

      }
    }


    this.order.TotalPrice = many


    // Handle paymentId and shipmentId as numbers: Set to null if not defined
    this.order.CustomerId = this.order.CustomerId ?? "";
    this.order.PaymentId = this.order.PaymentId ?? 0; // Default to 0 if undefined
    this.order.ShipmentId = this.order.ShipmentId ?? 0; // Default to 0 if undefined
    this.order.Status = this.order.Status ?? 0; // Default to 0 if undefined


    console.log(this.order);



    this.orderservice.CreateOrder(this.order).subscribe({
      next: (createdOrder) => {
        const orderId = createdOrder.Id;
        this.order.OrderItems.forEach(item => {
          item.OrderId = orderId; // Set the OrderId for each order item
        });
        console.log("Order created with items:", this.order);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }





}
