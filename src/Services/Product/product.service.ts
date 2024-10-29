
import { Injectable } from '@angular/core';
import { IproductEn } from '../../InterFaces/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpclient: HttpClient) { }
  GetAllPagenation(subcatId: number): Observable<IproductEn[]> {
    return this.httpclient.get<IproductEn[]>(`${environment.baseUrl}/Product/ProductPagination/${subcatId}`)
  }
}
