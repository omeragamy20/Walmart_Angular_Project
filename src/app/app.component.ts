import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../Comopnents/header/header.component';
import { HomeComponent } from '../Comopnents/home/home.component';
import { FooterComponent } from '../Comopnents/footer/footer.component';
import {TranslateModule} from "@ngx-translate/core";   // <--- standalone only
import {TranslateService} from "@ngx-translate/core";

import { BehaviorSubject, Observable } from 'rxjs';
import { LanguageService } from '../Services/Language/language.service';
import { Injectable } from '@angular/core';
import { ProductPaginationBySubCatComponent } from '../Comopnents/product-pagination-by-sub-cat/product-pagination-by-sub-cat.component';
import { CategoryComponent } from '../Comopnents/category/category.component';
import { AsideComponent } from '../Comopnents/aside/aside.component.spec';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, FooterComponent, RouterOutlet,ProductPaginationBySubCatComponent,CategoryComponent,AsideComponent,TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  title = 'WalMart';
  lang:string="ar"
  
  constructor(private translate: TranslateService , private langSer:LanguageService) {
    this.translate.use(this.lang);
    
  }
  ngOnInit(): void {
    this.langSer.getLangugae().subscribe({
      next: (res) => {
        this.lang = res;
      },
      error: (err) => {
        console.error("Error fetching language:", err);
      }
    });
  }

}
