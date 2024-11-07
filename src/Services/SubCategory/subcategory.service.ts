import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubcategoryAr, ISubcategoryEn } from '../../InterFaces/sub-category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private httpclient: HttpClient) { }
  GetAllSubCAtbyCatid(catid: number): Observable<ISubcategoryEn[]>{
    return this.httpclient.get<ISubcategoryEn[]>(`${environment.baseuRL}/SubCategory/GetSubCategoryByCatId/${catid}`)
  }

  GetAllSubCAtbyCatid_Ar(catid: number): Observable<ISubcategoryAr[]>{
    return this.httpclient.get<ISubcategoryAr[]>(`${environment.baseuRL}/SubCategory/GetSubCategoryByCatId/${catid}`)
  }
}
