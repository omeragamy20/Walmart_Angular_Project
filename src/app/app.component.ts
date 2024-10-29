import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Comopnents/header/header.component';
import { HomeComponent } from '../Comopnents/home/home.component';
import { FooterComponent } from '../Comopnents/footer/footer.component';
import { ProductPaginationBySubCatComponent } from '../Comopnents/product-pagination-by-sub-cat/product-pagination-by-sub-cat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, FooterComponent, RouterOutlet,ProductPaginationBySubCatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WalMart';
}
