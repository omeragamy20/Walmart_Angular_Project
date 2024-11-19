import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OrderService } from '../../../../../Services/Order/order.service';
import { CustomerOrder } from '../../../../../InterFaces/customer-order';
import { LanguageService } from '../../../../../Services/Language/language.service';
import { IProduct, Product } from '../../../../../InterFaces/product';
import { ProductService } from '../../../../../Services/Product/product.service';
import { NgFor, NgStyle } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [RouterLink,NgFor , RouterLinkActive,TranslateModule ,NgStyle],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  customerOrders:CustomerOrder[] = [] ; 
  Prds :IProduct[] = [] as IProduct[]
  prdsIDs =[]
  prdsQuantity =[]
  lang:string =""

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

}
