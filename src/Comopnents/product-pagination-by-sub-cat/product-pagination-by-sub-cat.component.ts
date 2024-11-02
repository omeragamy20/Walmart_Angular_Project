import { Component, NgModule, OnInit } from '@angular/core';
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
  fillpagnationproduct: IproductEn[] = [] as IproductEn[];
  URL = "https://localhost:7028";

  constructor(private productapi: ProductService, private coockieservice: CookieService) {

  }



  ngOnInit(): void {
    this.getallpagnationprd()

  }



  addProductToCookie(p: IproductEn) {
    const products: IproductEn[] = JSON.parse(localStorage.getItem("SelectedProducts") || "[]");
    products.push(p)
    localStorage.setItem("SelectedProducts", JSON.stringify(products))
  }

  getallpagnationprd() {
    this.productapi.GetAllPagenation(7).subscribe({
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
