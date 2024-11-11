import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItems } from '../../InterFaces/order-items';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

  constructor(private httpclient: HttpClient) { }

  CreateOrderItem(orderItem: OrderItems): Observable<OrderItems> {
    return this.httpclient.post<OrderItems>(`${environment.baseURL}/OrderItem/Create`, JSON.stringify(orderItem), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }}
