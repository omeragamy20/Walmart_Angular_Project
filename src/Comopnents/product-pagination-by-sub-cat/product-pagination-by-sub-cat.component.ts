import { Component, Input, NgModule, OnInit } from '@angular/core';
import { IproductEn, Product } from '../../InterFaces/product';
import { ProductService } from '../../Services/Product/product.service';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-pagination-by-sub-cat',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './product-pagination-by-sub-cat.component.html',
  styleUrl: './product-pagination-by-sub-cat.component.css'
})

export class ProductPaginationBySubCatComponent implements OnInit {
  @Input() subcatid:number=0
  fillpagnationproduct: IproductEn[] = [] as IproductEn[];
  url = "http://localhost:5004/";

  constructor(private productapi: ProductService, private coockieservice: CookieService) {

  }



  ngOnInit(): void {
    this.getallpagnationprd()

  }



  addProductToCookie(p: IproductEn) {
    // const products: IproductEn[] = JSON.parse(localStorage.getItem("SelectedProducts") || "[]");
    const item = localStorage.getItem("SelectedProducts");
    let products = item ? JSON.parse(item) : [];
    let sameprod = products.find((one: IproductEn) => one.id == p.id)
    if (sameprod) {
      sameprod.quantity += 1
      localStorage.setItem("SelectedProducts", JSON.stringify(products))
    } else {

      p.quantity = 1;
      products.push(p)

      localStorage.setItem("SelectedProducts", JSON.stringify(products))
    }
  }

  getallpagnationprd() {
    this.productapi.GetAllPagenation(4).subscribe({
      next: (value) => {
        console.log(value);

        this.fillpagnationproduct = value
        console.log(this.fillpagnationproduct);

      },
      error: (err) => {
        console.log(err);

      },
    });
  }

  currentPage = 1;
  itemsPerPage = 6;

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.fillpagnationproduct.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.fillpagnationproduct.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
