import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseType } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(user: string, password: string) {
    return this.httpClient
      .post<LoginResponseType>('/login', { user, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }
}
