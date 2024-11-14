import { NgFor, NgIf } from '@angular/common';
import { Component, DoCheck, NgModule, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { IproductEn, Product } from '../../InterFaces/product';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-orderitems',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './orderitems.component.html',
  styleUrl: './orderitems.component.css'
})
export class OrderitemsComponent implements OnInit, DoCheck {
  [x: string]: any;
  URL = `${environment.url}`;

  productlocal: IproductEn[] | null = null;
  currentnom: number = 0
  month: string | null = null
  day: string | null = null
  totalprice: number = 0;
  constructor(private cookieService: CookieService) {

  }
  ngDoCheck(): void {
    // this.show
    this.productlocal
    this.currentnom
    this.remove
    this.getdata
    this.plus
    this.min
  }



  ngOnInit(): void {
    // const productData = this.cookieService.get('Selectedprod');
    // console.log(productData);

    // const decodedData = decodeURIComponent(productData);
    // this.productFromCookie = productData ? JSON.parse(productData) : null;
    this.getdata()
    this.date()
    this.totalprice
  }





  getdata() {
    const productdata = localStorage.getItem("SelectedProducts")
    this.productlocal = productdata ? JSON.parse(productdata) : [];
    if (!Array.isArray(this.productlocal)) {
      console.error("Expected an array, but got:", this.productlocal);
      this.productlocal = []; // Fallback to an empty array if the data is not an array
    }
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





  plus(nom: number) {

    let item = localStorage.getItem("SelectedProducts")
    let prod = item ? JSON.parse(item) : []
    let x = prod.find((p: IproductEn) => p.id == nom);
    if (x.quantity == null || x.quantity == 0) {
      x.quantity == 1
      localStorage.setItem("SelectedProducts", JSON.stringify(prod))
      this.getdata()
    } else {
      x.quantity += 1
      let total = 0;
      total += x.quantity * x.price
      x.totall = total
      this.totalprice = total
      localStorage.setItem("SelectedProducts", JSON.stringify(prod))
      // x.quantity = this.currentnom
      this.getdata()
    }
  }

  min(nom: number) {
    let item = localStorage.getItem("SelectedProducts")
    let prod = item ? JSON.parse(item) : []
    let x = prod.find((p: IproductEn) => p.id == nom);
    if (x.quantity == 0) {
      let s = prod.filter((p: IproductEn) => p.id !== nom)
      localStorage.setItem("SelectedProducts", JSON.stringify(s))
      this.getdata()
    } else {
      x.quantity -= 1
      let total = 0;
      total += x.quantity * x.price
      x.totall = total
      this.totalprice = total
      localStorage.setItem("SelectedProducts", JSON.stringify(prod))
      this.getdata()
    }
  }





}






