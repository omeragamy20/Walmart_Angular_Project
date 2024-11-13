import { Component, Inject, inject } from '@angular/core';
import { IProduct } from '../../InterFaces/product';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../Services/Product/product.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-images',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,CommonModule,TranslateModule],
  templateUrl: './all-images.component.html',
  styleUrl: './all-images.component.css'
})
export class AllImagesComponent {
  borderStyle: string = '1px solid black';
  product!:IProduct[];
  url="http://localhost:5004";
  readonly dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { images: string[] }) { }
  activeImageIndex = 0;
  setActiveImage(index: number) {
    this.activeImageIndex = index;
    }
  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.data?.images.length;
  }

  prevImage() {
    this.activeImageIndex = (this.activeImageIndex - 1 + this.data?.images.length) % this.data?.images.length;
  }
  changeBorder() {
    this.borderStyle = this.borderStyle === '1px solid black' ? '2px solid black' : '2px solid black';
  }
}
