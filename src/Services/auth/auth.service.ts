import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private IdKey = 'id';
  constructor() { }

  setTokenAndId(token: string , id : string): void {
    sessionStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.IdKey, id);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getId(): string | null {
    return sessionStorage.getItem(this.IdKey);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.IdKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
