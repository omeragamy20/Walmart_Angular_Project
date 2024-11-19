 import { ChangeDetectionStrategy, Component, HostListener, OnInit ,inject, signal} from '@angular/core';
import { ProductService } from '../../Services/Product/product.service';
import { IProduct } from '../../InterFaces/product';
import { ActivatedRoute } from '@angular/router';
import { SpecificationComponent } from '../specification/specification.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AllImagesComponent } from '../all-images/all-images.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RateComponent } from '../rate/rate.component';
import { LanguageService } from '../../Services/Language/language.service';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../environments/environment.development';
// import { Component } from '@angular/core';
// import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDialogModule,MatExpansionModule,RateComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit{
  accordionItems = [
    { title: 'Product Details', contentType: 'description', isOpen: false },
    { title: 'Specifications', contentType: 'specifications', isOpen: false }
  ];
  accordionItemsAr = [
    { title: 'تفاصيل المنتج', contentType: 'وصف', isOpen: false },
    { title: 'مواصفات', contentType: 'مواصفات', isOpen: false }
  ];
  sections = [
    'Product Details',
    'Specifications',
  ];
  borderStyle: string = '1px solid black';
  product!:IProduct[];
  showSidebar = false;
  lang:string='';
  sectionOffset: number = 0;
  num1:number=0;
  num2:number=0;
  num3:number=0;
  num4:number=0;
  num5:number=0;
  temp1:number=0;
  temp2:number=0;
  temp3:number=0;
  temp4:number=0;
  temp5:number=0;
  url= `${environment.url}`;
  openedSections: boolean[] = Array(this.sections.length).fill(false);
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);
  isfeedbackformOpend = false;
  ratingvalue:number=0;
constructor(private _productservice:ProductService,private route: ActivatedRoute,private _Language :LanguageService){}
  ngOnInit(): void {
    this._Language.getLangugae().subscribe({
      next: (res) => {
        this.lang = res
      },
      error:(err)=> {
        console.log(err);

      },
    })
   const productId = this.route.snapshot.params['id'];

    console.log(productId);
    this._productservice.getproductbyId(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.product = res;
        this.product[0].rate = Math.floor(this.product[0].rate * 10) / 10;
        this.ratingvalue = this.product[0].rate;
        console.log(this.product[0].rate);
        this.product[0].rates.forEach(element => {
          if (element == 1)
            this.num1++;
          else if (element == 2) {
            this.num2++;
          }
          else if (element == 3) {
            this.num3++;
          }
          else if (element == 4) {
            this.num4++;
          }
          else if (element == 5) {
            this.num5++;
          }
        });
        this.temp1 = this.num1;
        this.temp2 = this.num2;
        this.temp3 = this.num3;
        this.temp4 = this.num4;
        this.temp5 = this.num5;
        if (this.product[0].totalRate > 0) {
          this.num1 = (Math.floor(((this.num1 / this.product[0].totalRate) * 100) * 10) / 10);
          this.num2 = Math.floor(((this.num2 / this.product[0].totalRate) * 100) * 10) / 10;
          this.num3 = Math.floor(((this.num3 / this.product[0].totalRate) * 100) * 10) / 10;
          this.num4 = Math.floor(((this.num4 / this.product[0].totalRate) * 100) * 10) / 10;
          this.num5 = Math.floor(((this.num5 / this.product[0].totalRate) * 100) * 10) / 10;
          console.log(this.product[0].id);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    //         console.log(this.product[0].id);
    //     }
    // })
    this.calculateSectionOffset();

  }
  private calculateSectionOffset() {
    const section = document.getElementById('specific-section');
    if (section) {
      this.sectionOffset = section.offsetTop;
      console.log(`Section offset calculated: ${this.sectionOffset}`);
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= this.sectionOffset) {
      this.showSidebar = true;
    } else {
      this.showSidebar = false;
    }
  }
  activeImageIndex = 0;
  setActiveImage(index: number) {
    this.activeImageIndex = index;
    }

  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.product[0]?.imageUrls.length;
  }

  prevImage() {
    this.activeImageIndex = (this.activeImageIndex - 1 + this.product[0]?.imageUrls.length) % this.product[0]?.imageUrls.length;
  }
  changeBorder() {
    this.borderStyle = this.borderStyle === '1px solid black' ? '2px solid black' : '2px solid black';
  }
  openDialog() {
    const dialogRef = this.dialog.open(SpecificationComponent,{
      data:{specificationsValues:this.product[0].facilities,specifications:this.product[0].values,
        specificationsValuesAr:this.product[0].facilities_Ar,specificationsAr:this.product[0].values_Ar
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openImageModal() {
    const dialogRef = this.dialog.open(AllImagesComponent,{
      data:{ images: this.product[0].imageUrls }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });}
    toggleSection(index: number): void {
      this.openedSections[index] = !this.openedSections[index];
    }
    openFeedbackForm() {
      this.isfeedbackformOpend = true;
    }
    closeFeedbackForm() {
      this.isfeedbackformOpend = false;
    }
    getStarClass(rate: number, star: number): string {
      if (rate >= star) {console.log(rate)
        return 'fa-star rating filled';
      } else if (rate >= star - 0.5) {console.log(rate);
       return 'fa-star-half-alt rating filled';
      } else {console.log(rate)
        return 'fa-star rating';
      }
    }

    toggleAccordion(index: number) {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }
  toggleAccordionAr(index: number) {
    this.accordionItemsAr[index].isOpen = !this.accordionItemsAr[index].isOpen;
  }


    // add product to cart
    addProductToCookie(p: IProduct) {
      // const products: IproductEn[] = JSON.parse(localStorage.getItem("SelectedProducts") || "[]");
      const item = localStorage.getItem("SelectedProducts");
      let products = item ? JSON.parse(item) : [];
      let sameprod = products.find((one: IProduct) => one.id == p.id)
      if (sameprod) {
        sameprod.quantity += 1
        localStorage.setItem("SelectedProducts", JSON.stringify(products))
      } else {

        p.quantity = 1;
        products.push(p)

        localStorage.setItem("SelectedProducts", JSON.stringify(products))
      }
    }
}

