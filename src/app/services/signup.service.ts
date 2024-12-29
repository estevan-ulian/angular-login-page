import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { SignupType } from '../types/signup-response.type';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private httpClient: HttpClient) {}

  signup(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.httpClient
      .post<SignupType>('/signup', {
        name,
        email,
        password,
        confirmPassword,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }
}
