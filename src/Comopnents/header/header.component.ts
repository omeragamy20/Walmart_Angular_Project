import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../Services/Language/language.service';
import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../Services/User/user.service';
import { User } from '../../InterFaces/user';

interface Department {
  name: string;
  parts: string[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NgFor,NgIf,CommonModule,TranslateModule,JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
// export class HeaderComponent implements OnInit {

export class HeaderComponent implements OnInit, DoCheck {
  user:User ={} as User
  id:string ="id"
  count: number = 0;
  moneyy: any;
  totalprice: number = 0;

  lang:string=''
  constructor(private lanSer:LanguageService,private _UserService:UserService){

  }
  ngDoCheck(): void {
    this.many();
    this.money();
  }

  ngOnInit(): void {
    this.many();
    this.money();
    this.lanSer.getLangugae().subscribe({
      next:(res)=>{
        this.lang=res
      }
    })

        this.id =sessionStorage.getItem("id")!
        this._UserService.GetUserById(this.id).subscribe({
          next:(res)=>{
            this.user = res
            console.log(this.user)
          },
          error:(err)=> {
            console.log(err);

          },
        })



  }


  many(): void {

    let all = localStorage.getItem("SelectedProducts");
    let prod = all ? JSON.parse(all) : []

    let totalquantity = 0;
    if (Array.isArray(prod)) {
      for (let i = 0; i < prod.length; i++) {
        totalquantity += prod[i].quantity ? prod[i].quantity : 0;
      }
      this.count = totalquantity
    }


  }

  money() {

    let all = localStorage.getItem("SelectedProducts")
    let moneyy = all ? JSON.parse(all) : null;
    this.totalprice = 0;
    if (Array.isArray(moneyy)) {
      for (let i = 0; i < moneyy.length; i++) {
        // it will be an array here
        let propp = moneyy[i]
        let sum = propp.price * (propp.quantity || 1);
        this.totalprice += sum

      }
    }



  }




  // ngOnInit(): void {
  //   this.lanSer.getLangugae().subscribe({
  //     next:(res)=>{
  //       this.lang=res
  //     }
  //   })
  // }

switchLanguage(lang:string){
  this.lanSer.changeLang(lang);
}


  departments: Department[] = [
    { name: 'Savings', parts: ['Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home','Shop All Savings', 'Clothing & Accessories', 'Electronics', 'Home'] },
    { name: 'Grocery', parts: ['Beverages', 'Snacks', 'Frozen Food', 'Dairy'] },
    { name: 'Electronics &Video Games', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Clothing & Accessories', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Home', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Patio & Garden', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Toys', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Personal Care', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Beauty', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Health & wellness', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Baby', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Auto & tires', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },
    { name: 'Home Improvement', parts: ['Latest Arrivals', 'Trending Now', 'Bestsellers'] },

  ];

  // activeDepartment: Department | null = null;

  // setActiveDepartment(department: Department): void {
  //   this.activeDepartment = department;
  // }

  activeDepartment: Department | null = null;
  isDropdownOpen = false;

  setActiveDepartment(department: Department): void {
    this.activeDepartment = department;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
