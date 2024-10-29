import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategoryAr, ICategoryEn } from '../../InterFaces/category';
import { CategoryService } from '../../Services/Category/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  itemsPerPage: number = 6;
  currentPage: number = 0;
  AllCAtegory: ICategoryEn[] = [] as ICategoryEn[];

  constructor(private catserviceapi:CategoryService) {
  }
  ngOnInit(): void {
    this.GetAllCAt();
  }

  GetAllCAt() {
    this.catserviceapi.GetAllCategory().subscribe({
      next:(value)=> {
        console.log(value);
        this.AllCAtegory = value;
      },
      error:(err)=> {
        console.log(err);

      },
    });
  }

  getCurrentPageItems() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.AllCAtegory.slice(start, end);
  }


  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.AllCAtegory.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.AllCAtegory.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage >= 1) {
      this.currentPage--;
    }
  }

  isLastPage() {
    return (this.currentPage + 1) * this.itemsPerPage >= this.AllCAtegory.length;
  }

}
