import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IproductEn } from '../../InterFaces/product';
import { ProductService } from '../../Services/Product/product.service';
@Component({
  selector: 'app-home-section-one',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-section-one.component.html',
  styleUrl: './home-section-one.component.css'
})
export class HomeSectionOneComponent implements OnInit {

  fillpagnationproduct: IproductEn[] = [] as IproductEn[];


  constructor(private productapi: ProductService) {
  }
  ngOnInit(): void {
    this.getallpagnationprd()

  }

  getallpagnationprd() {
    this.productapi.GetAllPagenation(7).subscribe({
      next: (value) => {
        console.log(value);

        this.fillpagnationproduct = value
        console.log(this.fillpagnationproduct);

      },
      error: (err) => {
        console.log(err);

      },
    });
  }



}
export class CategoryComponent {
  
}