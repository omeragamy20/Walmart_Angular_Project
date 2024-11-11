import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../InterFaces/payment';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private httpclient: HttpClient) { }

  createPayment(data: Payment): Observable<Payment> {
    return this.httpclient.post<Payment>(`${environment.baseURL}/Payment/Create`, JSON.stringify(data), {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })
  }

  GetPayment(id:number):Observable<Payment>
  {
    return this.httpclient.get<Payment>(`${environment.baseURL}/Payment/GetById/${id}`)
  }
}
