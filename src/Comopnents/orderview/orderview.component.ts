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
import { JsonPipe } from '@angular/common';
import { PaymentServiceService } from '../../Services/payment-service.service';
import { Payment } from '../../InterFaces/payment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-orderview',
  standalone: true,
  imports: [RouterLink, ShapementsummeryComponent, OrderitemsComponent, OrderShapmentfooterComponent,PaypaylcomponintComponent,TranslateModule],
  templateUrl: './orderview.component.html',
  styleUrl: './orderview.component.css'
})
export class OrderviewComponent implements OnInit ,AfterContentInit {
  @Input()id :string = '';
  @Input()ShipID :number = 0;
  xx:createShipment ={} as createShipment
  address:string =""

  user:User ={} as User

  // userpaymntid:User ={} as User
  paymnt: Payment = {} as Payment
  order: Order = {} as Order

  constructor(private orderservice: OrderService,
    private shipService:ShepmentServiceService,
     private _ActivatedRoute :ActivatedRoute ,
    private _uSer: UserService,
  private paymentserv:PaymentServiceService) {


  }
  ngAfterContentInit(): void {
    this.shipService.Getshipment(this.ShipID).subscribe({
      next:(res)=>{
        this.xx = res
        console.log(this.xx)
      },error:(err)=>{
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
      next:(res)=>{
        this.user = res
      }
    })

    this.count();
    this.datee();
    this.paymnttimee.setDate(this.paymnttimee.getDate())
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

  // ////////////////////////payment paypal work ////////////////////

  userid!: string;
  totalprice!: number;
  // totalproduct!: IproductEn[] | any;
  getprice() {

    let item = localStorage.getItem("SelectedProducts")
    let prod = item ? JSON.parse(item) : []
    let total = 0;
    // this.totalproduct = prod;
    if (Array.isArray(prod)) {

      for (let i = 0; i < prod.length; i++) {

        total += prod[i].price * prod[i].quantity

      }

    }
    console.log(total);
    // console.log(this.totalproduct);

    this.totalprice = total;
  }

  CreatePayment() {
    this.paymnt.Amount = this.totalprice;
    this.paymnt.CustomerId = this.user.id;
    this.paymnt.PaymentDate = this.paymnttimee;
    this.paymnt.PaymentMethod_en = '';
// this.paymentserv.createPayment()
}


}
