import { Component, Input } from "@angular/core";
export interface IProduct {
    id:number;
    title_en:string;
    title_ar:string;
    description_en:string;
    description_ar:string;
    price:number;
    stock:number;
    rate:number;
    totalRate:number;
    rates:number[];
    imageUrls:string[];
    subCategoryIds: number[];
    subCategoryNames:string[];
    facilities: string[]
    facilities_Ar: string[];
    values:string[];
    values_Ar:string[];
    subCategoryNamesAr:string[];
    quantity: number;


}


export interface Product {

}

// export interface IproductEn{
// id:number,
// title_en:string,
// description_en:string,
// price: number,
// imageUrls:string ,
// stock:number
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   imageUrl: string;

// }

export interface IproductEn {
  id: number,
  title_en: string,
  title_ar: string,
  description_en: string,
  description_ar: string,
  price: number,
  imageUrls: string,
  stock: number,
  quantity: number,
  totall: number
}

// export interface IproductAr {
//   id: number,
//   title_en: string,
//   description_en: string,
//   description_ar: string,
//   price: number,
//   imageUrls: string,
//   stock: number,
//   quantity: number,
//   totall: number
// }
