import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit, signal } from '@angular/core';
import { IProduct } from '../../InterFaces/product';
import { ProductService } from '../../Services/Product/product.service';
import { Router } from '@angular/router';
import { Pagination } from '../../InterFaces/pagination';
import { MatExpansionModule } from '@angular/material/expansion';
import { Facilities } from '../../InterFaces/facilities';
import { LanguageService } from '../../Services/Language/language.service';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [CommonModule,MatExpansionModule],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent implements OnInit{
  allProducts:IProduct[]=[] as IProduct[];
  filteredProducts : IProduct[]=[] as IProduct[];
  selectedFilters = new Set<string>();
  specifictions:Facilities[]=[] as Facilities[];
  @Input('id') subcatid:number=0;
  totalProducts = 0;
  pageSize = 4;
  currentPage = 1;
  totalPages = 0;
  url="http://localhost:5004";
  readonly panelOpenState = signal(false);
  ratingvalue:number=0;
  lang:string='';
  constructor(private productService:ProductService,private router: Router,private _Language:LanguageService){}
  ngOnInit(): void {
    this._Language.getLangugae().subscribe({
      next: (res) => {
        this.lang = res
      }
    })
    this.products();
    this.Facilities();
  }
 products():void{
  this.productService.getAllPagination(this.subcatid ,this.currentPage,this.pageSize).subscribe({
    next: (res: Pagination<IProduct>) => {
      console.log(res.data);
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
    error: (err) => console.error('Error loading products:', err),
  });
 }
 Facilities():void{
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
        return Array.from(this.selectedFilters).every(filter => product.facilities.includes(filter));
      });
    }
  }

  getStarClass(rate: number, star: number): string {
    if (rate >= star) {
      return 'fa-star rating filled';
    } else if (star==5&& rate>4&&(rate >= star - 0.5 || star-rate>0.5)) {
      return 'fa-star-half-alt rating filled';
    } else {
      return 'fa-star rating';
    }
  }


}
