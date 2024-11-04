import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../Services/Product/product.service';
import { Rate } from '../../InterFaces/Rate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css'
})
export class RateComponent  {
 
  @Output() formClosed = new EventEmitter<void>();
  isVisible = true; 
  @Input('productId') productId!: number;
  
  rating = 0;
  stars = [1, 2, 3, 4, 5];
  rates: Rate = { id: 0, rating: 0, customerId: '', productId: 0 };

  constructor(private rateService:ProductService){}
  addRate(){
    this.rates.productId = this.productId;
    this.rateService.addRate(this.rates).subscribe({
      next:(res)=>{
        this.rates=res;          
          this.closeFeedbackForm();
      }
    })
  }

  closeFeedbackForm() {
    this.formClosed.emit();
    this.isVisible = false;
  }

  rate(stars: number) {
    this.rating = stars;
    this.rates.rating=stars;
  }

  submitRating() {
    this.rates.customerId = '09534e5c-a5e6-4401-a07b-42efdaf1a756'; 
    this.addRate();

    // alert(this.rates.productId);
    this.closeFeedbackForm();
  }
}