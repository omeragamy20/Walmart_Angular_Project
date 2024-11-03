import { Component, Input } from "@angular/core";

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
  description_en: string,
  price: number,
  imageUrls: string,
  stock: number,
  quantity: number
}

