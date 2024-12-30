import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseType } from '../types/login-response.type';
import { tap } from 'rxjs';
import { SignupType } from '../types/signup-response.type';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:8080/api/auth';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private toastrService: ToastrService
  ) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponseType>(
        this.apiUrl + '/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        tap((value) => {
          this.cookieService.set('auth-token', value.token, {
            expires: (1 / 24) * 2, // 2 hours
          });
          this.cookieService.set('username', value.name, {
            expires: (1 / 24) * 2, // 2 hours
          });
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<SignupType>(this.apiUrl + '/register', {
        name,
        email,
        password,
      })
      .pipe(
        tap((value) => {
          this.cookieService.set('auth-token', value.token);
          this.cookieService.set('username', value.name);
        })
      );
  }

  logout() {
    this.cookieService.delete('auth-token');
    this.cookieService.delete('username');
  }
}
