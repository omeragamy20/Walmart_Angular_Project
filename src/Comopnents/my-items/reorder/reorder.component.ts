import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CustomerOrder } from '../../../InterFaces/customer-order';
import { IProduct, IproductEn } from '../../../InterFaces/product';
import { OrderService } from '../../../Services/Order/order.service';
import { LanguageService } from '../../../Services/Language/language.service';
import { ProductService } from '../../../Services/Product/product.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-reorder',
  standalone: true,
  imports: [RouterLink,RouterOutlet,RouterLinkActive,TranslateModule],
  templateUrl: './reorder.component.html',
  styleUrl: './reorder.component.css'
})
export class ReorderComponent {
  url = `${environment.url}`;
  customerOrders:CustomerOrder[] = [] ;
  Prds :IProduct[] = [] as IProduct[]
  prdsIDs =[]
  prdsQuantity =[]
  lang:string =""
  PrdEn:IproductEn={} as IproductEn

  constructor(private orderSer:OrderService , private langSer : LanguageService , private prdSer:ProductService ){}
  ngOnInit(): void {
          this.langSer.getLangugae().subscribe({
            next:(res)=>{
              this.lang = res
            }
          })


   this.orderSer.GetCustomerOrders(sessionStorage.getItem("id")!).subscribe({
    next:(res)=>{
      this.customerOrders = res
      console.log(this.customerOrders)

          for(let i = 0 ; i< this.customerOrders.length ; i++)
            {
              for(let j = 0 ; j< this.customerOrders[i].orderItems.length ; j++)
              {
                if (!this.prdsIDs.includes(this.customerOrders[i].orderItems[j])) {
                  this.prdsIDs.push(this.customerOrders[i].orderItems[j]);
                  this.prdsQuantity.push(this.customerOrders[i].orderItemsQuantity[j]);
                }
              }
            }

            this.loadprd()
          }
})




    console.log(this.Prds)
    console.log(this.prdsIDs)

  }


loadprd(){

  for(let i = 0 ; i<this.prdsIDs.length ; i++)
    {
      this.prdSer.getOrderPrd(this.prdsIDs[i]).subscribe({
        next:(res)=>{
          if (Array.isArray(res)) {
            this.Prds = [...this.Prds, ...res];
          } else {
            this.Prds.push(res);
          }
        }
      })
    }

}


  trackByFn(index:number,prd:IProduct){

    return prd.id

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
