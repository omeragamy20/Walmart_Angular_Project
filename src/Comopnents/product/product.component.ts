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


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDialogModule,MatExpansionModule,RateComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit{

  sections = [
    'Product Details',
    'Specifications',
  ];
  borderStyle: string = '1px solid black';
  product!:IProduct[];
  showSidebar = false;
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
  url="http://localhost:5004";
  openedSections: boolean[] = Array(this.sections.length).fill(false);
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);
  isfeedbackformOpend = false;
  ratingvalue:number=0;
constructor(private _productservice:ProductService,private route: ActivatedRoute){}
  ngOnInit(): void {
   const productId = this.route.snapshot.params['id'];

    console.log(productId);
    this._productservice.getproductbyId(productId).subscribe({
        next:(res)=>{
            console.log(res);
            this.product=res;
            this.ratingvalue=Math.floor(this.product[0].rate*10)/10;
            this.product[0].rates.forEach(element => {
              if(element==1)
                this.num1++;
              else if(element==2){
                this.num2++;
              }
              else if(element==3){
                this.num3++;
              }
              else if(element==4){
                this.num4++;
              }
              else if (element==5){
                this.num5++;
              }
            });
            this.temp1=this.num1;
            this.temp2=this.num2;
            this.temp3=this.num3;
            this.temp4=this.num4;
            this.temp5=this.num5;
            this.num1=Math.floor(((this.num1/this.product[0].totalRate)*100)*10)/10;
            this.num2=Math.floor(((this.num2/this.product[0].totalRate)*100)*10)/10;
            this.num3=Math.floor(((this.num3/this.product[0].totalRate)*100)*10)/10;
            this.num4=Math.floor(((this.num4/this.product[0].totalRate)*100)*10)/10;
            this.num5=Math.floor(((this.num5/this.product[0].totalRate)*100)*10)/10;
            console.log(this.product[0].id);
        }
    })
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
      data:{specificationsValues:this.product[0].facilities,specifications:this.product[0].values}
      
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
      if (rate >= star) {
        return 'fa-star rating filled';
      } else if (star==5&& rate>4&&(rate >= star - 0.5 || star-rate>0.5)) {
        return 'fa-star-half-alt rating filled';
      } else {
        return 'fa-star rating';
      }
    }
}

