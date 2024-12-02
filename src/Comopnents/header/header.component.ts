import { CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../Services/Language/language.service';
import { Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../Services/User/user.service';
import { User } from '../../InterFaces/user';
import { SearchService } from '../../Services/search.service';
import { CategoryService } from '../../Services/Category/category.service';
import { SubcategoryService } from '../../Services/SubCategory/subcategory.service';
import { ICategoryAr, ICategoryEn } from '../../InterFaces/category';
import { ISubcategoryAr, ISubcategoryEn } from '../../InterFaces/sub-category';

interface Department {
  Category: string;
  Subcategory: string[];
  SubcategoryId: number[];

}


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf, CommonModule, TranslateModule, JsonPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
// export class HeaderComponent implements OnInit {

export class HeaderComponent implements OnInit, DoCheck {
  user: User = {} as User
  id: string = "id"
  count: number = 0;
  moneyy: any;
  totalprice: number = 0;
  @Output() searchEvent = new EventEmitter<string>();
  lang: string = '';
  searchTerm: string = '';
  catlisst_En!: ICategoryEn[];
  catlisst_Ar!: ICategoryAr[];
  SubCat_En!: ISubcategoryEn[];
  SubCat_Ar!: ISubcategoryAr[];
  menuOpen = false;
  constructor(private route:Router,private lanSer: LanguageService, private _UserService: UserService, private searchService: SearchService,
          private catservice:CategoryService,private Subcatservic:SubcategoryService) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    console.log('Menu Open:', this.menuOpen);

  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
  }
  onSearchClick(): void {
    // SearchProduct
    this.route.navigate(['SearchProduct', this.searchTerm]);
    // this.searchService.setSearchTerm(this.searchTerm);
  }
  ngDoCheck(): void {
    this.many();
    this.money();
  }

  ngOnInit(): void {
    this.many();
    this.money();
    this.lanSer.getLangugae().subscribe({
      next: (res) => {
        this.lang = res
      }, error: (err) => {
        console.log(err);

      },
    })

    this.id = sessionStorage.getItem("id")!
    this._UserService.GetUserById(this.id).subscribe({
      next: (res) => {
        this.user = res
        console.log(this.user)
      },
      error: (err) => {
        console.log(err);

      },
    })

    this.catservice.GetAllCategory().subscribe({
      next: (value) => {
        this.catlisst_En = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.catservice.GetAllCategory_Ar().subscribe({
      next: (value) => {
        this.catlisst_Ar = value;
      },
      error: (err) => {
        console.log(err);
      },
    });

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

  switchLanguage(lang: string) {
    console.log(lang);

    this.lanSer.changeLang(lang);
  }

  // ///////Department Dropdowin///////////



  activeCAten: ISubcategoryEn[] | null = null;
  activeCAtar: ISubcategoryAr[] | null = null;
  isDropdownOpen = false;

  setActiveDepartment(catid: number): void {
    // console.log(catid);
    // this.Subcatservic.GetAllSubCAtbyCatid(catid).subscribe({
    //   next: (value) => {
    //     this.activeCAt = value;
    //   },
    // });
    if (this.lang == 'en') {
      this.Subcatservic.GetAllSubCAtbyCatid(catid).subscribe({
        next: (value) => {
          this.activeCAten = value;
        },
      });
    }
    else {
      this.Subcatservic.GetAllSubCAtbyCatid_Ar(catid).subscribe({
        next: (value) => {
          this.activeCAtar = value;
        },
      });
    }
  }


  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  SignOut(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("authToken")
    this.route.navigateByUrl("/home")
  }
}
