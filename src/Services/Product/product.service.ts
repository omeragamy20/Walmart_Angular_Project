import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../../InterFaces/pagination';
import { IProduct, IproductEn } from '../../InterFaces/product';
import { environment } from '../../environments/environment.development';
import { Facilities } from '../../InterFaces/facilities';
import { Rate } from '../../InterFaces/Rate';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url='https://localhost:7016/api/Product/pagination';
  // private urlOne='https://localhost:7016/api/Product/GetOne';
  constructor(private httpClient:HttpClient) { }
  GetAllPagenation(subcatId: number):Observable<IproductEn[]> {
    return this.httpClient.get<IproductEn[]>(`${environment.baseuRL}/Product/ProductPagination/${subcatId}`)
  }
  getAllPagination(subcatid:number,pageNumber:number,count:number):Observable<Pagination<IProduct>>{
    const params = new HttpParams()
      .set('subcatid',subcatid.toString())
      .set('pageNumber', pageNumber.toString())
      .set('count', count.toString());
    return this.httpClient.get<Pagination<IProduct>>(this.url,{params})
   }
   getproductbyId(id:number):Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(`${environment.baseuRL}/Product/GetOne?id=${id}`)
   }
   getFacilitiybysubid(subid:number):Observable<Facilities[]>{
    const params =new HttpParams()
    .set('subid',subid.toString());
    return this.httpClient.get<Facilities[]>(`${environment.baseuRL}/Facility/Facilities`,{params});
   }
   addRate(rate: Rate): Observable<Rate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Rate>(`${environment.baseuRL}/Rate`, rate, { headers });
  }
  getRate(productId:number):Observable<number>{
    return this.httpClient.get<number>(`${environment.baseuRL}/Rate?productId=${productId}`);
  }
}
