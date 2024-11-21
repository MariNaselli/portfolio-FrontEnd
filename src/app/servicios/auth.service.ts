import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface LoginDto {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private tokenKey = 'auth_token';
  private apiUrlNetsJS = environment.apiUrlNetsJS;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    const token = this.cookieService.get(this.tokenKey);
    if (token) {
      this.currentUserSubject.next(true);
    }
  }

  login(username: string, password: string): Observable<any> {
    let url = `${this.apiUrlNetsJS}/auth/login`;
    return this.http
      .post<{ token: string }>(url, {
        username,
        password,
      })
      .pipe(
        map((response) => {
          if (response.token) {
            // Guarda el token en las cookies
            this.cookieService.set(this.tokenKey, response.token);
            this.currentUserSubject.next(true);
            return { success: true};
          }
          return { success: false};
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(false);
    this.cookieService.delete(this.tokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUserSubject.asObservable();
  }
}
