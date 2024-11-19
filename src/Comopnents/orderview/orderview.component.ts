import { AfterContentInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShapementsummeryComponent } from '../shapementsummery/shapementsummery.component';
import { OrderitemsComponent } from '../orderitems/orderitems.component';
import { OrderShapmentfooterComponent } from '../order-shapmentfooter/order-shapmentfooter.component';
import { OrderService } from '../../Services/Order/order.service';
import { Order } from '../../InterFaces/order';
import { OrderItems } from '../../InterFaces/order-items';
import { PaypaylcomponintComponent } from '../paypaylcomponint/paypaylcomponint.component';
import { UserService } from '../../Services/User/user.service';
import { User } from '../../InterFaces/user';
import { ShepmentServiceService } from '../../Services/Shepment/shepment-service.service';
import { createShipment } from '../../InterFaces/createShipment';
import { JsonPipe, NgIf } from '@angular/common';
import { PaymentServiceService } from '../../Services/payment-service.service';
import { Payment } from '../../InterFaces/payment';
import { FormsModule, NgModel } from '@angular/forms';
import { OrderitemService } from '../../Services/OrderItem/orderitem.service';

@Component({
  selector: 'app-orderview',
  standalone: true,
  imports: [FormsModule, RouterLink, ShapementsummeryComponent, OrderitemsComponent, OrderShapmentfooterComponent, PaypaylcomponintComponent, NgIf],
  templateUrl: './orderview.component.html',
  styleUrl: './orderview.component.css'
})

export class OrderviewComponent implements OnInit, AfterContentInit {

  @Input() id: string = '';
  @Input() ShipID: number = 0;
  xx: createShipment = {} as createShipment
  address: string = ""
  user: User = {} as User
  paymnt: Payment = {} as Payment
  order: Order = {} as Order
  paymnetId!: number;

  constructor(private orderservice: OrderService,
    private shipService: ShepmentServiceService,
    private _ActivatedRoute: ActivatedRoute,
    private _uSer: UserService,
    private paymentserv: PaymentServiceService,
    private orderitemserv: OrderitemService) {


  }
  ngAfterContentInit(): void {
    this.shipService.Getshipment(this.ShipID).subscribe({
      next: (res) => {
        this.xx = res
        console.log(this.xx)
      }, error: (err) => {
        console.log(err)
      }
    })

  }


  num: any;
  paymnttimee: Date = new Date;
  timee: Date | any;
  Month: Date | any;
  Day: Date | any;


  ngDoCheck(): void {
    this.count();
  }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['CusId'];
    this.ShipID = this._ActivatedRoute.snapshot.params['shipID'];

    this._uSer.GetUserById(this.id).subscribe({
      next: (res) => {
        this.user = res
      }
    })

    this.count();
    this.datee();
    this.paymnttimee.setDate(this.paymnttimee.getDate());

    this.getprice();
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


  // ////////////////////////payment paypal work ////////////////////

  selectedValue: any;

  onDivClick(value: any) {
    this.selectedValue = value;
    console.log('Selected Value:', this.selectedValue); // For debugging
  }

  userid!: string;
  totalprice!: number;
  getprice() {

    let item = localStorage.getItem("SelectedProducts")
    let prod = item ? JSON.parse(item) : []
    let total = 0;
    if (Array.isArray(prod)) {

      for (let i = 0; i < prod.length; i++) {

        total += prod[i].price * prod[i].quantity

      }

    }
    console.log(total);

    this.totalprice = total;
  }

  selectedOption: string = '';


  showFirstDiv: boolean = true;

  CreatePayment() {
    this.paymnt.Amount = this.totalprice;
    this.paymnt.CustomerId = this.id;
    this.paymnt.PaymentDate = this.paymnttimee;
    this.paymnt.PaymentMethod_en = this.selectedOption;
    this.paymnt.PaymentMethod_ar = (this.selectedOption);
    console.log(this.paymnt);
    this.showFirstDiv = false;
    this.paymentserv.createPayment(this.paymnt).subscribe({
      next: (res) => {
        console.log(res)
        this.paymnetId = res.id
        console.log(this.paymnetId)
      }, error: (err) => {
        console.log(err);

      },
    })
  }

  isChecked = false;

  // Method to toggle the checkbox state
  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }

  //////////////////// create order

  orderidinitem!: number;

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

        if (this.order.id) {
          orderitem.orderId = this.order.id;  // Set OrderId here before sending to backend
        }
        orderitem.productId = include.id
        orderitem.quantity = include.quantity
        orderitem.price = include.quantity * include.price

        this.order.orderItems.push(orderitem)

      }
    }


    this.order.totalPrice = this.totalprice;


    // Handle paymentId and shipmentId as numbers: Set to null if not defined
    this.order.customerId = this.id;
    this.order.paymentId = this.paymnetId; // Default to 0 if undefined
    this.order.shipmentId = this.ShipID; // Default to 0 if undefined
    this.order.status = 0; // Default to 0 if undefined


    console.log(this.order);


    this.orderservice.CreateOrder(this.order).subscribe({
      next: (createdOrder) => {
        const orderId = createdOrder.id;
        console.log(createdOrder.id);
        this.order.orderItems.forEach(item => {
          item.orderId = orderId; // Set the OrderId for each order item
        });
        console.log("Order created with items:", this.order);
        this.CreateOrderItem(createdOrder.id)
      },
      error: (err) => {
        console.log(err);
      }
    });


  }

  // ///// create order Items//////////
  CreateOrderItem(orderiditem: number) {
    let all = localStorage.getItem("SelectedProducts");
    let prod = all ? JSON.parse(all) : []
    for (let i = 0; i < prod.length; i++) {

      let include = prod[i]

      let orderitem: OrderItems = {} as OrderItems
      orderitem.orderId = orderiditem;
      // if (this.order.Id) {
      //     // Set OrderId here before sending to backend
      // }
      orderitem.productId = include.id
      orderitem.quantity = include.quantity
      orderitem.price = include.quantity * include.price

      console.log(orderitem);

      this.orderitemserv.CreateOrderItem(orderitem).subscribe({
        next: (value) => {
          console.log(value);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    localStorage.clear();
    this.totalprice = 0;


  }

}
