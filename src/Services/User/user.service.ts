import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../InterFaces/user';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserRegister } from '../../InterFaces/user-register';
import { UserLogin } from '../../InterFaces/user-login';
import { Token } from '@angular/compiler';
import { MyToken } from '../../InterFaces/my-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private htpClient:HttpClient) { }

  
  GetAllUsers():Observable<User[]>{
    return this.htpClient.get<User[]>(`${environment.baseuRL}/Account`)
  }
  RegisterUser(user:UserRegister):Observable<UserRegister>{
    return this.htpClient.post<UserRegister>(`${environment.baseuRL}/Account/Register`,JSON.stringify(user), {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })
  }
  UserLogin(user:UserLogin):Observable<MyToken>{
    return this.htpClient.post<MyToken>(`${environment.baseuRL}/Account/Login`,JSON.stringify(user), {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })
  }
}
