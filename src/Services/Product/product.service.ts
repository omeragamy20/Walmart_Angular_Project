import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IproductEn } from '../../InterFaces/product';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclient:HttpClient) { }

  GetAllPagenation(subcatId: number):Observable<IproductEn[]> {
    return this.httpclient.get<IproductEn[]>(`${environment.baseURL}/Product/ProductPagination/${subcatId}`)
  }
}
