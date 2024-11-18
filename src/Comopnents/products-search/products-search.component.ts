import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit, signal, SimpleChanges, OnChanges } from '@angular/core';
import { IProduct, IproductEn } from '../../InterFaces/product';
import { ProductService } from '../../Services/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '../../InterFaces/pagination';
import { MatExpansionModule } from '@angular/material/expansion';
import { Facilities } from '../../InterFaces/facilities';
import { LanguageService } from '../../Services/Language/language.service';
import { HeaderComponent } from "../header/header.component";
import { SearchService } from '../../Services/search.service';
import { environment } from '../../environments/environment.development';
@Component({
  selector: 'app-products-search',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './products-search.component.html',
  styleUrl: './products-search.component.css'
})
export class ProductsSearchComponent implements OnInit , OnChanges {

  allProducts:IProduct[]=[] as IProduct[];
  filteredProducts : IProduct[]=[] as IProduct[];
  selectedFilters = new Set<string>();
  specifictions:Facilities[]=[] as Facilities[];
  subcatid:number=0;
  @Input('searchname') searchname:string='';
  searchProducts:IProduct[]=[] as IProduct[];
  // subcatid=2;
  totalProducts = 0;
  pageSize = 4;
  currentPage = 1;
  totalPages = 0;
  url=`${environment.url}`;
  readonly panelOpenState = signal(false);
  ratingvalue:number=0;
  lang:string='';

  constructor(private productService:ProductService,private router: Router,
    private _Language:LanguageService,private searchService: SearchService,private route: ActivatedRoute){}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    console.log(this.searchname);

    this._Language.getLangugae().subscribe({
      next: (res) => {
        this.lang = res
      }
    });
    //  this.searchService.searchTerm$.subscribe(searchTerm => {
    //   this.products(searchTerm);
    // });
    this.products();
    this.Facilities();
    console.log(this.subcatid);

  }

  products(): void{
    // SearchByProductname
    this.searchname=  this.route.snapshot.params['searchname'];
    console.log(this.searchname);
  this.productService.SearchByProductname(this.searchname).subscribe({
    next: (res: Pagination<IProduct>) => {
      console.log(res.data);
      this.subcatid = res.data[0].subCategoryIds[0]
      console.log(this.subcatid);
      this.allProducts = res.data;
      this.allProducts = this.allProducts.map(product => {
        return {
          ...product,
          rate: Math.floor(product.rate * 10) / 10
        };
      });
      this.filteredProducts=this.allProducts;
      this.totalProducts = res.count;
      console.log(this.allProducts);
      this.totalPages = Math.ceil(this.totalProducts / this.pageSize);

    },
    error: (err) => {
      console.log(err);

     }
  });
  }


 Facilities():void{
  // this.subcatid=  this.route.snapshot.params['id'];
  this.productService.getFacilitiybysubid(this.subcatid).subscribe({
    next:(res)=>{
      this.specifictions=res;
      console.log(this.specifictions);
    }
  })
  }


 onPageChange(newPage: number): void {
  if (newPage >= 1 && newPage <= this.totalPages) {
    this.currentPage = newPage;
    this.products();
  }
  }


Details(id:number){
  this.router.navigate(['product', id]);
  }


 openedSections: boolean[] = Array(this.specifictions.length).fill(false);

  toggleSection(index: number): void {
    this.openedSections[index] = !this.openedSections[index];
  }


  onFilterChange(value: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    if (checked) {
      this.selectedFilters.add(value);
    } else {
      this.selectedFilters.delete(value);
    }
    this.applyFilters();
  }


  applyFilters() {
    if (this.selectedFilters.size === 0) {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(product => {
        return Array.from(this.selectedFilters).some(filter => product.facilities.includes(filter));
      });
      console.log(this.filteredProducts)
    }
  }
  onFilterChangeAr(value: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    if (checked) {
      this.selectedFilters.add(value);
    } else {
      this.selectedFilters.delete(value);
    }
    this.applyFiltersAr();
  }


  applyFiltersAr() {
    if (this.selectedFilters.size === 0) {
      this.filteredProducts = this.allProducts;
    } else {
      this.filteredProducts = this.allProducts.filter(product => {
        return Array.from(this.selectedFilters).some(filter => product.facilities_Ar.includes(filter));
      });
    }
  }

  getStarClass(rate: number, star: number): string {
    if (rate >= star) {
      return 'fa-star rating filled';
    } else if (rate >= star - 0.5)  {
      return 'fa-star-half-alt rating filled';
    } else {
      return 'fa-star rating';
    }
  }

  // add product to cart
  addProductToCookie(p: IProduct) {
    // const products: IproductEn[] = JSON.parse(localStorage.getItem("SelectedProducts") || "[]");
    const item = localStorage.getItem("SelectedProducts");
    let products = item ? JSON.parse(item) : [];
    let sameprod = products.find((one: IProduct) => one.id == p.id)
    if (sameprod) {
      sameprod.quantity += 1
      localStorage.setItem("SelectedProducts", JSON.stringify(products))
    } else {

      p.quantity = 1;
      products.push(p)

      localStorage.setItem("SelectedProducts", JSON.stringify(products))
    }
  }


}
