import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { OrderComponent } from '../order/order.component';
import { OrderitemsComponent } from '../orderitems/orderitems.component';
import { SummeryComponent } from '../summery/summery.component';
import { ShapementsummeryComponent } from '../shapementsummery/shapementsummery.component';
import { OrderShapmentfooterComponent } from '../order-shapmentfooter/order-shapmentfooter.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Shapment } from '../../InterFaces/shapment';
import { ShepmentServiceService } from '../../Services/Shepment/shepment-service.service';

@Component({
  selector: 'app-shap-ment-view',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, OrderitemsComponent, SummeryComponent, ShapMentViewComponent, OrderComponent, RouterOutlet, ShapementsummeryComponent, OrderShapmentfooterComponent],
  templateUrl: './shap-ment-view.component.html',
  styleUrl: './shap-ment-view.component.css'
})
export class ShapMentViewComponent implements OnInit {

  num: any;
  timee: Date | any;
  Month: Date | any;
  Day: Date | any;




  shepment: Shapment = {} as Shapment


  constructor(private fb: FormBuilder, private shempmentservice: ShepmentServiceService, private router: Router) {


  }



  ngDoCheck(): void {

    this.count();

  }






  ngOnInit(): void {
    // this.checkoutForm = this.fb.group({

    //   firstName: ['', [Validators.required, Validators.minLength(2)]],
    //   lastName: ['', [Validators.required, Validators.minLength(2)]],
    //   streetAddress: ['', [Validators.required, Validators.minLength(3)]],




    // })





    this.count();
    this.datee();

  }


  Addshapment(): void {
    this.shempmentservice.createShipment(this.shepment).subscribe({

      next: (res) => {
        this.router.navigateByUrl('/orderview')
      },
      error: (err) => {
        console.log(err);

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

    this.Day = timee.toLocaleString('default', { weekday: 'long' })
    this.Month = timee.toLocaleString('default', { month: 'long' })


  }



}
