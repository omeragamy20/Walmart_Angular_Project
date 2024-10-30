import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../../InterFaces/pagination';
import { IProduct } from '../../InterFaces/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url='https://localhost:7016/api/Product/pagination';
  // private urlOne='https://localhost:7016/api/Product/GetOne';
  constructor(private httpClient:HttpClient) { }
  getAllPagination(pageNumber:number,count:number):Observable<Pagination<IProduct>>{
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('count', count.toString());
    return this.httpClient.get<Pagination<IProduct>>(this.url,{params})
   }
   getproductbyId(id:number):Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(`${environment.baseUrl}/Product/GetOne?id=${id}`)
   }
}
