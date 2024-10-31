 import { Component, HostListener, OnInit ,inject, signal} from '@angular/core';
import { ProductService } from '../../Services/Product/product.service';
import { IProduct } from '../../InterFaces/product';
import { ActivatedRoute } from '@angular/router';
import { SpecificationComponent } from '../specification/specification.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AllImagesComponent } from '../all-images/all-images.component';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatDialogModule,MatExpansionModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
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
  url="http://localhost:5004";
  openedSections: boolean[] = Array(this.sections.length).fill(false);
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);
constructor(private _productservice:ProductService,private route: ActivatedRoute){
    
  }
  ngOnInit(): void {
   const productId = this.route.snapshot.params['id'];

    console.log(productId);
    this._productservice.getproductbyId(productId).subscribe({
        next:(res)=>{
            console.log(res);
            this.product=res;
            console.log(this.product[0].imageUrls);
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
}

