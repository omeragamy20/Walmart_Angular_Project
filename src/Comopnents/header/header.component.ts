import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, DoCheck {

  count: any;
  moneyy: any;
  totalprice: number = 0;

  constructor() {


  }
  ngDoCheck(): void {
    this.many();
    this.money();
  }

  ngOnInit(): void {
    this.many();
    this.money();
  }


  many(): void {

    let all = localStorage.getItem("SelectedProducts");
    let prod = all ? JSON.parse(all) : []

    this.count = prod.length


  }

  money() {

    let all = localStorage.getItem("SelectedProducts")
    let moneyy = all ? JSON.parse(all) : null;
    this.totalprice = 0;
    if (Array.isArray(moneyy)) {
      for (let i = 0; i < moneyy.length; i++) {
        // it will be an array here
        let propp = moneyy[i]
        this.totalprice += propp.price
      }
    }



  }




}
