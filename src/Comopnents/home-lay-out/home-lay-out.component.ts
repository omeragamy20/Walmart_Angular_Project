import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductPaginationBySubCatComponent } from '../product-pagination-by-sub-cat/product-pagination-by-sub-cat.component';
import { VideoSliderComponent } from '../video-slider/video-slider.component';

@Component({
  selector: 'app-home-lay-out',
  standalone: true,
  imports: [RouterLink, NgFor,ProductPaginationBySubCatComponent,VideoSliderComponent],
  templateUrl: './home-lay-out.component.html',
  styleUrl: './home-lay-out.component.css'
})
export class HomeLayOutComponent {

}
