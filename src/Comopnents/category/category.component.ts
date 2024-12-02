import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategoryAr, ICategoryEn } from '../../InterFaces/category';
import { CategoryService } from '../../Services/Category/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AsideComponent } from "../aside/aside.component.spec";
import { environment } from '../../environments/environment.development';
import { LanguageService } from '../../Services/Language/language.service';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink, CommonModule, AsideComponent, NgIf],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']

})
export class CategoryComponent implements OnInit, OnChanges {

  // url:string = "http://localhost:5004"
  url = `${environment.url}`;
  AllCAtegory: ICategoryEn[] = [] as ICategoryEn[];
  AllCAtegoryAr: ICategoryAr[] = [] as ICategoryAr[];
  lang: string = ''
  constructor(private _languageSer: LanguageService, private catserviceapi: CategoryService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.GetAllCAt();
  }
  onPageChange(language: string) {
    if (this.lang == 'en') {
      this.GetAllCAt();
    }
    else {
      this.GetAllCAt();
    }
  }
  ngOnInit(): void {
    this._languageSer.getLangugae().subscribe({
      next: (res) => {
        this.lang = res
      }
    });
    this.GetAllCAt();

    // this.GetAllCatAr();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateItemsPerPage(); // Update items per page on resize
  }

  updateItemsPerPage() {
    if (window.innerWidth <= 768) {
      this.itemsPerPage = 3;
    } else if (window.innerWidth > 768 && window.innerWidth <= 990) {
      this.itemsPerPage = 4;
    }

    else {
      this.itemsPerPage = 6;
    }
  }

  GetAllCAt() {
    if (this.lang == 'en') {
      this.catserviceapi.GetAllCategory().subscribe({
        next: (value) => {
          console.log(value);
          this.AllCAtegory = value;
        },
        error: (err) => {
          console.log(err);

        },
      });
    }
    else {
      this.catserviceapi.GetAllCategory_Ar().subscribe({
        next: (value) => {
          console.log(value);
          this.AllCAtegoryAr = value;
        },
        error: (err) => {
          console.log(err);

        },
      });
    }
  }


  itemsPerPage: number = 6;
  currentPage: number = 1;
  // getCurrentPageItems() {
  //   const start = this.currentPage * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   return this.AllCAtegory.slice(start, end);
  // }


  getpaginatedProducts(): ICategoryEn[] | ICategoryAr[] | any {
    if (this.lang == 'en') {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.AllCAtegory.slice(startIndex, startIndex + this.itemsPerPage);
    }
    else {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.AllCAtegoryAr.slice(startIndex, startIndex + this.itemsPerPage);
    }
  }

  nextPage() {
    if (this.lang == 'en') {
      if ((this.currentPage * this.itemsPerPage) < this.AllCAtegory.length) {
        this.currentPage++;
      }
    }
    else {
      if ((this.currentPage * this.itemsPerPage) < this.AllCAtegoryAr.length) {
        this.currentPage++;
      }
    }

  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // isLastPage() {
  //   return (this.currentPage + 1) * this.itemsPerPage >= this.AllCAtegory.length;
  // }
  ////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////

  // images = [
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-71c0/k2-_d18f8241-d0c9-4e3b-a18e-98a0a4c7444a.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Kitchen & dining' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-3b37/k2-_e8b126fd-7e4d-445e-9818-931b74c2128a.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Furniture' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-aacc/k2-_4579d38f-ecb5-448c-a62a-bf806c2c694c.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Decor' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-9214/k2-_287ead61-7b87-4a36-8362-b669aafa1897.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Bedding' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-1901/k2-_b6064017-0842-429c-b0be-4271e4f08cc0.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Storage' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-400a/k2-_1cad0807-90ca-489f-871f-9e85756615c2.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Bath' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-8f79/k2-_781f3943-bbe9-46b8-9119-0b8359eaaf10.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Mattresses' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2a49/k2-_465226e9-563c-4f85-8dd1-d46f472c45ba.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Appliances & floor' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-1513/k2-_8be242e7-7641-4887-aa3b-4f5c8e3e1ee5.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Fragrances' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-769c/k2-_41a8182e-c16e-44d7-94e1-8e7d137e27e2.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Kitchen appliances' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2b54/k2-_98242d71-1929-4fd2-969c-8627090db99d.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Rugs' },
  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-eead/k2-_0f2fb550-6fa1-4eac-9aa9-92369229cc97.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Arts & crafts' },
  // ];

  // newImages = [


  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-769c/k2-_41a8182e-c16e-44d7-94e1-8e7d137e27e2.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },

  //   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-1513/k2-_8be242e7-7641-4887-aa3b-4f5c8e3e1ee5.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' }
  // ];
}
