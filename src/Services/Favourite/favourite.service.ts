import { Injectable } from '@angular/core';
import { FavouritePrd } from '../../InterFaces/favourite-prd';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http:HttpClient) { }

createFav(fav:FavouritePrd):Observable<FavouritePrd>{
  return this.http.post<FavouritePrd>(`${environment.baseURL}/Favorite`, JSON.stringify(fav), {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }) 
}

getAllByCusId(id:string):Observable<FavouritePrd[]>{
  return this.http.get<FavouritePrd[]>(`${environment.baseURL}/Favorite/${id}`)
}



DeleteFav(CustomerId:string,prdId:number):Observable<FavouritePrd>{
  return this.http.delete<FavouritePrd>(`${environment.baseURL}/Favorite/${CustomerId}/${prdId}`)
}


}
