import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryAr, ICategoryEn } from '../../InterFaces/category';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient: HttpClient) { }
  GetAllCategory(): Observable<ICategoryEn[]>{
    return this.httpclient.get<ICategoryEn[]>(`${environment.baseuRL}/Category`)
  }

  GetAllCategory_Ar(): Observable<ICategoryAr[]>{
    return this.httpclient.get<ICategoryAr[]>(`${environment.baseuRL}/Category`)
  }
}
