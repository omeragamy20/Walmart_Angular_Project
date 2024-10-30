import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { IProduct } from '../../InterFaces/product';
import { ProductService } from '../../Services/Product/product.service';
import { Router } from '@angular/router';
import { Pagination } from '../../InterFaces/pagination';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [CommonModule,MatExpansionModule],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent implements OnInit{
  sections = [
    'Departments',
    'Price',
    'Brand',
    'Availability',
    'Customer Ratings',
    'Data Storage',
    'Hard Drive Type',
    'Screen Size'
  ];
  openedSections: boolean[] = Array(this.sections.length).fill(false);

  toggleSection(index: number): void {
    this.openedSections[index] = !this.openedSections[index];
  }
  allProducts:IProduct[]=[] as IProduct[];
  totalProducts = 0;
  pageSize = 4;
  currentPage = 1;
  totalPages = 0;  
  url="http://localhost:5004";
  readonly panelOpenState = signal(false);
  constructor(private productService:ProductService,private router: Router){}
  ngOnInit(): void {
    
    this.products();
  }
 products():void{
  this.productService.getAllPagination(this.currentPage,this.pageSize).subscribe({
    next: (res: Pagination<IProduct>) => {
      console.log(res.data);
      this.allProducts = res.data;
      this.totalProducts = res.count;
      this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
    },
    error: (err) => console.error('Error loading products:', err),
  });
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
}
