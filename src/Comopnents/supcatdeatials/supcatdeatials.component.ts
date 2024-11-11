import { NgFor, NgIf } from '@angular/common';
import { Component,input,Input, OnInit,Pipe } from '@angular/core';
import { pipe } from 'rxjs';
import { ProductService } from '../../Services/Product/product.service';
import { IproductEn } from '../../InterFaces/product';

@Component({
  selector: 'app-supcatdeatials',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './supcatdeatials.component.html',
  styleUrl: './supcatdeatials.component.css'
})
export class SupcatdeatialsComponent



implements OnInit {
  @Input() id: number = 0;

  price: string= "25$";
  originalPrice: number = 1.2628;
  productName: string = 'this is the tishert of woman';
  rating: number = 4.5;
  reviewCount: number = 1243;
  bestSeller: boolean = true;
  imageUrl: string = 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF';
  currencyCode: string = 'USD'; //
  constructor(private productapiserv:ProductService) {
  }
  ngOnInit(): void {
    this.GetAllPrdutc(this.id);
  }

  GetAllPrdutc(subcatid:number) {
    this.productapiserv.GetAllPagenation(subcatid).subscribe({
      next: value => {
        // this.AllProdutcinSubCat = value;
      },
      error:(err)=> {
        console.log(err);

      },
    });
  }

  // cards = [
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-High-Rise-Skinny-Jegging_3a245fab-ec3c-44a6-9e5e-1adb012153b2.4e8ee5f9f7cea05b340b3dc48471f7af.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF', name: 'tera sky', details: 'ts skinny geeing',price:'25$',rating:'*' },
  //   { image: 'https://i5.walmartimages.com/seo/TS-BOOTCUT-JEGGING_cb6fd785-dfda-47f7-a929-ebb31a469291.3000fcf650c713a2c30d5392b6ff396c.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'wowmans plus' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'flecce sweatirshirt',price:'256$',rating:'**' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plaid-Button-Shirt_9d10e3db-9430-4a55-8dd2-15a48a2ac82b.9b04e860efc6b8d21ec0d28cf1d92f53.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'plaid Buttion' },
  //   { image: 'https://i5.walmartimages.com/seo/Lee-Womens-s-Plus-Stretch-Relaxed-Fit-Straight-Leg-Jean_08ed8ef9-b5ce-4c2a-ac2f-ff766e0e21ea_1.8d0ad2aac791e30afa5756833b2093fd.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'stritch relaxed',price:'95$',rating:'**' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Knit-Pant_e7c9af63-5c40-4eda-9208-569f999a9b1a.a027f18132b79fe2bf558e4d874ac19d.jpeg?odnHeight=392&odnWidth=290&odnBg=FFFFFF', name: 'tera sky', details: 'knit pant',price:'47$' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Fleece-Sweatpant-0X-4X_5760fe82-9707-4d63-9294-0cf1f815fe79.696fb1c1ad06b12fd00e1a7961bfe8b1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'fleac swiptpan',price:'78$',rating:'**' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Core-Straight-Leg-Jeans_586eb3e7-a73a-4573-90a8-3348d94a725c.5d52569de379324412cabf0b0912386f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'mafg tishirt',price:'25$' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'flecce sweatirshirt',price:'244$',rating:'***' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'flecce sweatirshirt',price:'95$',rating:'*' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'flecce sweatirshirt',price:'28$' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Waffle-Henley-Top_a53a9107-c3e7-4344-9f3c-b460398f08f7.20eaa078c54a80842eb87e325d73ed67.webp?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'plaid Buttion',price:'25$',rating:'**' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Knit-Pant_e7c9af63-5c40-4eda-9208-569f999a9b1a.a027f18132b79fe2bf558e4d874ac19d.jpeg?odnHeight=392&odnWidth=290&odnBg=FFFFFF', name: 'tera sky', details: 'knit pant',price:'47$' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Fleece-Sweatpant-0X-4X_5760fe82-9707-4d63-9294-0cf1f815fe79.696fb1c1ad06b12fd00e1a7961bfe8b1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'fleac swiptpan',price:'78$',rating:'*' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Core-Straight-Leg-Jeans_586eb3e7-a73a-4573-90a8-3348d94a725c.5d52569de379324412cabf0b0912386f.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'mafg tishirt',price:'25$' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'flecce sweatirshirt',price:'244$',rating:'**' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'flecce sweatirshirt',price:'95$',rating:'*' },
  //   { image: 'https://i5.walmartimages.com/seo/Terra-Sky-Women-s-Plus-Size-Button-Down-Waffle-Knit-Shacket-0X-4X_e94d9de7-b793-4629-a3e0-5ab667f1b7c8.495a3cb7b3db85bca303859ca0ba9279.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF', name: 'tera sky', details: 'flecce sweatirshirt',price:'28$',rating:'*' },
  // ];
}
