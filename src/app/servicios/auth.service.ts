import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface LoginDto {
  username: string;
  password: string;
}

export interface SignupDto {
  nombre: string;
  apellido: string;
  email: string;
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

  constructor(
    private cookieService: CookieService, private http: HttpClient, private router: Router) {
    const token = this.cookieService.get(this.tokenKey);
    if (token) {
      this.currentUserSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    let url = `${this.apiUrlNetsJS}/auth/login`;
    return this.http
      .post<any>(url, {
        email,
        password,
      })
      .pipe(
        map((response) => {
          if (response.token && response.codigo_persona) {
            this.cookieService.set(this.tokenKey, response.token);
            this.currentUserSubject.next(true);
            // Redirigir al portfolio del usuario
            this.router.navigate([`/portfolio/${response.codigo_persona}`]);
            return { success: true };
          }
          return { success: false };
        })
      );
  }

  signup(data: SignupDto): Observable<any> {
    const url = `${this.apiUrlNetsJS}/auth/signup`;
    return this.http.post(url, data).pipe(
      map((response: any) => {
        if (response.success) {
          return {
            success: true,
            message: response.message || 'Usuario creado exitosamente',
          };
        }
        return {
          success: false,
          message: response.message || 'Error al crear el usuario',
        };
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
