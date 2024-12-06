import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PortfolioService } from './portfolio.service';

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
  private currentUserSubject: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  private localStorageKey = 'auth_user_data';

  private apiUrlNetsJS = environment.apiUrlNetsJS;

  constructor(
    private http: HttpClient,
    private router: Router,
    private portfolioService: PortfolioService
  ) {
    const userData = localStorage.getItem(this.localStorageKey);
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrlNetsJS}/auth/login`;
    return this.http.post<any>(url, { email, password }).pipe(
      map((response) => {
        if (
          response.token &&
          response.codigo_persona &&
          response.nombre &&
          response.apellido
        ) {
          const userData = {
            token: response.token,
            email,
            codigo: response.codigo_persona,
            nombre: response.nombre,
            apellido: response.apellido,
          };
          localStorage.setItem(this.localStorageKey, JSON.stringify(userData));
          this.currentUserSubject.next(userData);

          // Redirigir al portfolio del usuario
          this.router.navigate([
            `/portfolio/${response.nombre.toLowerCase()}-${response.apellido.toLowerCase()}-${
              response.codigo_persona
            }`,
          ]);
          // this.portfolioService.obtenerPortfolio(userData.codigo);
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
    localStorage.removeItem(this.localStorageKey);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<any | null> {
    return this.currentUserSubject.asObservable();
  }
}
