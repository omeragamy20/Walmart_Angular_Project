import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private lang:BehaviorSubject<string>
  constructor() {

    this.lang=new BehaviorSubject('en')
   }
   getLangugae():Observable<string>{
    return this.lang.asObservable()
   }

   changeLang(lang:string){
    this.lang.next(lang)
   }
}
