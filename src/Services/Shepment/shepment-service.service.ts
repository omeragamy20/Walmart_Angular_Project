import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { createShipment } from '../../InterFaces/createShipment';

@Injectable({
  providedIn: 'root'
})
export class ShepmentServiceService {

  constructor(private httpclient: HttpClient) {

  }

  createShipment(data: createShipment): Observable<createShipment> {
    return this.httpclient.post<createShipment>(`${environment.baseURL}/Shipment`, JSON.stringify(data), {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })
  }


  Getshipment(id:number):Observable<createShipment>
  {
    return this.httpclient.get<createShipment>(`${environment.baseURL}/Shipment/${id}`)
  }
}
