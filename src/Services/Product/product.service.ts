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

  private url='https://e-walmartapi.runasp.net/api/Product/pagination';
  // private urlOne='https://localhost:7016/api/Product/GetOne';
  constructor(private httpClient:HttpClient) { }
  GetAllPagenation(subcatId: number):Observable<IproductEn[]> {
    return this.httpClient.get<IproductEn[]>(`${environment.baseuRL}/Product/ProductPagination/${subcatId}`)
  }
  getAllPagination(subcatid:number=0,pageNumber:number,count:number,searchTerm: string = ''):Observable<Pagination<IProduct>>{
   let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('count', count.toString());
      if (searchTerm) {
        params = params.set('searchTerm', searchTerm);
    }
    if (subcatid) {
      params = params.set('subcatid',subcatid.toString());
    }
    return this.httpClient.get<Pagination<IProduct>>(this.url,{params})
   }



   getproductbyId(id:number):Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(`${environment.baseuRL}/Product/GetOne?id=${id}`)
   }

   getOrderPrd(id:number):Observable<IProduct>{
    return this.httpClient.get<IProduct>(`${environment.baseuRL}/Product/GetOne?id=${id}`)
   }





   getFacilitiybysubid(subid:number):Observable<Facilities[]>{
    const params =new HttpParams()
    .set('subid',subid.toString());
    return this.httpClient.get<Facilities[]>(`${environment.baseuRL}/Facility/Facilities`,{params});
   }



   addRate(rate: Rate): Observable<Rate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Rate>(`${environment.baseuRL}/Rate/CreateRate`, rate);
  }
  // https://localhost:7016/api/Rate/CreateRate



  getRate(productId:number):Observable<number>{
    return this.httpClient.get<number>(`${environment.baseuRL}/Rate?productId=${productId}`);
  }
  private searchurl='https://e-walmartapi.runasp.net/api/Product/search';
  SearchByProductname(searchTerm: string):Observable<Pagination<IProduct>>{
    // let params = new HttpParams()
    //   .set('searchTerm', searchTerm);
     return this.httpClient.get<Pagination<IProduct>>(`${environment.baseuRL}/Product/search?ProductName=${searchTerm}`)
    }
}
