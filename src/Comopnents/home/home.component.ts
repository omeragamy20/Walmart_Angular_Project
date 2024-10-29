import { Component } from '@angular/core';
import { HomeSectionOneComponent } from "../home-section-one/home-section-one.component";
import { ProductPaginationBySubCatComponent } from '../product-pagination-by-sub-cat/product-pagination-by-sub-cat.component';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSectionOneComponent,ProductPaginationBySubCatComponent,CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
