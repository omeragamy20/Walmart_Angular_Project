import { AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Comopnents/header/header.component';
import { HomeComponent } from '../Comopnents/home/home.component';
import { FooterComponent } from '../Comopnents/footer/footer.component';
import {TranslateModule} from "@ngx-translate/core";   // <--- standalone only
import {TranslateService} from "@ngx-translate/core";
import { LanguageService } from '../Services/Language/language.service';
import { ProductPaginationBySubCatComponent } from '../Comopnents/product-pagination-by-sub-cat/product-pagination-by-sub-cat.component';
import { CategoryComponent } from '../Comopnents/category/category.component';
import { AsideComponent } from '../Comopnents/aside/aside.component.spec';
import { HttpClient } from '@angular/common/http';
import { OrderComponent } from '../Comopnents/order/order.component';
import { ShapMentViewComponent } from '../Comopnents/shap-ment-view/shap-ment-view.component';
import { OrderviewComponent } from '../Comopnents/orderview/orderview.component';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, FooterComponent, RouterOutlet, ProductPaginationBySubCatComponent
            , CategoryComponent, AsideComponent, TranslateModule, OrderComponent, ShapMentViewComponent, OrderviewComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit   {
  title = 'WalMart';
  lang:string=""

  constructor(private translate: TranslateService , private langSer:LanguageService ,private http:HttpClient) {

  }


  ngOnInit(): void {
    this.langSer.getLangugae().subscribe({
      next: (res) => {
        this.lang = res;
        this.translate.use(this.lang);
      },
      error: (err) => {
        console.error("Error fetching language:", err);
      }
    });


  }


}
