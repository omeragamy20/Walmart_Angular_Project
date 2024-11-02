import { NgFor, NgIf } from '@angular/common';
import { Component, DoCheck, NgModule, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { IproductEn, Product } from '../../InterFaces/product';

@Component({
  selector: 'app-orderitems',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './orderitems.component.html',
  styleUrl: './orderitems.component.css'
})
export class OrderitemsComponent implements OnInit, DoCheck {
  [x: string]: any;
  URL = "https://localhost:7028";

  productlocal: IproductEn[] | null = null;

  month: string | null = null
  day: string | null = null
  constructor(private cookieService: CookieService) {

  }
  ngDoCheck(): void {
    this.productlocal
    this.remove
    this.getdata
  }



  ngOnInit(): void {
    // const productData = this.cookieService.get('Selectedprod');
    // console.log(productData);

    // const decodedData = decodeURIComponent(productData);
    // this.productFromCookie = productData ? JSON.parse(productData) : null;
    this.getdata()
    this.date()



  }

  getdata() {

    const productdata = localStorage.getItem("SelectedProducts")

    this.productlocal = productdata ? JSON.parse(productdata) : null

  }



  remove(p: IproductEn) {

    let item = localStorage.getItem("SelectedProducts")
    let prod = item ? JSON.parse(item) : null


    let x = prod.filter((prod: IproductEn) => prod.id !== p.id)

    localStorage.setItem("SelectedProducts", JSON.stringify(x));
    this.getdata()

  }


  date() {

    let x = new Date()
    x.setDate(x.getDate() + 15)
    this.month = x.toLocaleString('default', { month: "long" })
    this.day = x.toLocaleString('default', { day: "numeric" })


  }







}
