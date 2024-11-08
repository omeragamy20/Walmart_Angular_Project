import { Injectable } from '@angular/core';
import { Shapment } from '../../InterFaces/shapment';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShepmentServiceService {

  constructor(private httpclient: HttpClient) {

  }

  createShipment(data: Shapment): Observable<Shapment> {
    return this.httpclient.post<Shapment>(`${environment.baseURL}/Product/ProductPagination/`, data)
  }

}
