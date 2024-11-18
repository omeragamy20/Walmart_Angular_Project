import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../Services/Product/product.service';
import { Rate } from '../../InterFaces/Rate';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../Services/Language/language.service';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.css'
})
export class RateComponent  implements OnInit{

  @Output() formClosed = new EventEmitter<void>();
  isVisible = true;
  @Input('productId') productId!: number;

  rating = 0;
  stars = [1, 2, 3, 4, 5];
  rates: Rate = { id: 0, rating: 0, customerId: '', productId: 0 };
  lang:string='';
  constructor(private rateService:ProductService,private _Language :LanguageService){}
  ngOnInit(): void {
    this._Language.getLangugae().subscribe({
      next: (res) => {
        this.lang = res
      }
    })}
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

cusomerid:string|null=sessionStorage.getItem("id")
  submitRating() {
    if (this.cusomerid) {
      this.rates.customerId = this.cusomerid;
    }
    this.addRate();

    // alert(this.rates.productId);
    this.closeFeedbackForm();
  }
}
