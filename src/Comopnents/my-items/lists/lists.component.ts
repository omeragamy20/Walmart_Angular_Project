import { AfterContentInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FavouriteService } from '../../../Services/Favourite/favourite.service';
import { FavouritePrd } from '../../../InterFaces/favourite-prd';
import { IProduct, IproductEn } from '../../../InterFaces/product';
import { ProductService } from '../../../Services/Product/product.service';
import { LanguageService } from '../../../Services/Language/language.service';
import { NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [RouterLink,RouterOutlet ,RouterLinkActive , NgFor ,TranslateModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit ,AfterContentInit {
  // url:string="https://localhost:7028"
  url= `${environment.url}`;
  ids:number[] = []
  lang:string =""
  favPrd :FavouritePrd[] = [] as FavouritePrd[]
  Prds :IProduct[] =[] as IProduct []

  PrdEn :IproductEn = {} as IproductEn
  constructor(private favSer:FavouriteService , private prService :ProductService ,private langSer : LanguageService){}
  ngOnInit(): void {

    this.langSer.getLangugae().subscribe({
      next:(res)=>{
        this.lang = res
      }
    })


    this.favSer.getAllByCusId(sessionStorage.getItem("id")!).subscribe({
      next:(res)=>{
        this.favPrd = res
        // console.log(this.favPrd);
        for (let i = 0; i < this.favPrd.length; i++) {
          this.ids.push(this.favPrd[i].productId)
        }

        for (let i = 0; i < this.ids.length; i++) {
          this.prService.getOrderPrd(this.ids[i]).subscribe({
            next:(res)=>{
              if (Array.isArray(res)) {
                this.Prds = [...this.Prds, ...res]; // Flattening the array into Prds
              } else {
                this.Prds.push(res); // If `res` is a single product object
              }

              console.log(this.Prds);
            }
          })
        }

      }
    })


  }
  ngAfterContentInit(): void {



  }


  addToCart(p: IProduct , quantity:number) {

    this.PrdEn.id = p.id ,
    this.PrdEn.description_en = p.description_en ,
    this.PrdEn.price = p.price ,
    this.PrdEn.imageUrls = p.imageUrls[0] ,
    this.PrdEn.stock = p.stock ,
    this.PrdEn.totall = p.price * quantity ,
    this.PrdEn.quantity = quantity


    const item = localStorage.getItem("SelectedProducts");
    let products = item ? JSON.parse(item) : [];
    let sameprod = products.find((one: IproductEn) => one.id == this.PrdEn.id)
    if (sameprod) {
      sameprod.quantity += 1
      localStorage.setItem("SelectedProducts", JSON.stringify(products))
    } else {
      this.PrdEn.quantity = 1;
      products.push(this.PrdEn)
      localStorage.setItem("SelectedProducts", JSON.stringify(products))
    }


  }




}
