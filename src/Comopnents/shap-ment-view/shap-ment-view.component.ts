import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { OrderitemsComponent } from '../orderitems/orderitems.component';
import { SummeryComponent } from '../summery/summery.component';
import { ShapementsummeryComponent } from '../shapementsummery/shapementsummery.component';
import { OrderShapmentfooterComponent } from '../order-shapmentfooter/order-shapmentfooter.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShepmentServiceService } from '../../Services/Shepment/shepment-service.service';
import { createShipment } from '../../InterFaces/createShipment';
import { UserService } from '../../Services/User/user.service';
import { User } from '../../InterFaces/user';

@Component({
  selector: 'app-shap-ment-view',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, OrderitemsComponent, SummeryComponent, ShapMentViewComponent, OrderComponent, RouterOutlet, ShapementsummeryComponent, OrderShapmentfooterComponent],
  templateUrl: './shap-ment-view.component.html',
  styleUrl: './shap-ment-view.component.css'
})
export class ShapMentViewComponent implements OnInit {
  num: any;
  timee: Date = new Date;
  Month: Date | any;
  Day: Date | any;
  
  user:User ={} as User
  shepment: createShipment = {} as createShipment
  
  constructor(private fb: FormBuilder 
    ,private shempmentservice: ShepmentServiceService, 
    private router: Router , private userSer:UserService) {
  }



  ngDoCheck(): void {

    this.count();

  }






  ngOnInit(): void {
    this.timee.setDate(this.timee.getDate() + 3)
    this.userSer.GetUserById(sessionStorage.getItem("id")!).subscribe({
     next:(res)=>{
      this.user = res

     }
    })

    this.count();
    this.datee();

  }


  Addshapment(): void {
    console.log(this.shepment)
    this.shepment.CustomerId = this.user.id
    this.shepment.ShipmentDate = this.timee.toISOString()
    // this.shepment.Address = this.user.address
    this.shempmentservice.createShipment(this.shepment).subscribe({
      next:(res)=>{
        console.log(res)
        this.shepment.id = res.id
        console.log(this.shepment.id) 
        this.router.navigateByUrl(`/orderview/${this.shepment.CustomerId}/${this.shepment.id}`)
      }
    })
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

    // this.Day = timee.toLocaleString('default', { weekday: 'long' })
    // this.Month = timee.toLocaleString('default', { month: 'long' })


  }



}
