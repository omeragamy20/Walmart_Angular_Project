import { Component, HostListener, Input, NgModule, OnInit } from '@angular/core';
import { IproductEn, Product } from '../../InterFaces/product';
import { ProductService } from '../../Services/Product/product.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FavouriteService } from '../../Services/Favourite/favourite.service';
import { FavouritePrd } from '../../InterFaces/favourite-prd';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../Services/Language/language.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-product-pagination-by-sub-cat',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink, NgIf],
  templateUrl: './product-pagination-by-sub-cat.component.html',
  styleUrl: './product-pagination-by-sub-cat.component.css'
})

export class ProductPaginationBySubCatComponent implements OnInit {

  CustomerId: string = ''
  favPrd: FavouritePrd = {} as FavouritePrd
  favProducts: FavouritePrd[] = [] as FavouritePrd[]

  favStatus: boolean = false


  lang: string = '';
  @Input() subcatid: number = 0
  fillpagnationproduct: IproductEn[] = [] as IproductEn[];
  // fillpagnationproductar: IproductEn[] = [] as IproductEn[];
  // url = "http://localhost:5004/";
  url = environment.url;

  constructor(private productapi: ProductService, private favService: FavouriteService,
    private coockieservice: CookieService, private _Language: LanguageService, private router: Router) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateItemsPerPage(); // Update items per page on resize
  }

  updateItemsPerPage() {
    if (window.innerWidth <= 768) {
      this.itemsPerPage = 3;
    } else if (window.innerWidth > 768 && window.innerWidth <= 990) {
      this.itemsPerPage = 4;
    }
    else {
      this.itemsPerPage = 6;
    }
  }


  ngOnInit(): void {
    this._Language.getLangugae().subscribe({
      next: (res) => {
        this.lang = res
      }
    });

    this.getallpagnationprd()
    this.CustomerId = sessionStorage.getItem("id")!

  }

  Details(id: number) {
    this.router.navigate(['product', id]);
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
    this.productapi.GetAllPagenation(this.subcatid).subscribe({
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


  // Favourite section


  addtoFavourite(prdId: number) {

    if (this.CustomerId == undefined) {
      this.router.navigateByUrl('/SignOrRegister')
    } else {
      this.favPrd.customerId = this.CustomerId
      this.favPrd.productId = prdId
      this.favService.getAllByCusId(this.CustomerId).subscribe({
        next: (res) => {
          this.favProducts = res

          let check = this.favProducts.some((ele) => {
            return ele.customerId === this.CustomerId && ele.productId === prdId;
          });

          if (check == true) {
            this.favService.DeleteFav(this.CustomerId, prdId).subscribe({
              next: () => {
                console.log(this.favStatus)

              }, error: (rej) => {
                console.log(rej);

              }
            })
          } else {

            this.favService.createFav(this.favPrd).subscribe({
              next: (res) => {
                this.favStatus = true
                console.log(this.favStatus)
              }, error: (rej) => {
                console.log(rej);

              }
            })

          }


        }
      })



    }






  }


  // isFavorited(prdId: number): boolean {
  //   return this.favProducts.find((ele=>{
  //     return ele.productId == prdId
  //   }));
  // }







}



