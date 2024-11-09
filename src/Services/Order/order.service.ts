import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../InterFaces/order';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpclient: HttpClient) { }


  CreateOrder(order: Order): Observable<Order> {
    return this.httpclient.post<Order>(`${environment.baseURL}/Order`, JSON.stringify(order), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
