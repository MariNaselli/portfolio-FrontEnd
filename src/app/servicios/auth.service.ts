import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tokenKey = 'auth_token';

  constructor(private cookieService: CookieService) {
    const token = this.cookieService.get(this.tokenKey);
    if (token) {
      // Si hay un token guardado en la cookie, actualizamos el estado del usuario logueado
      this.currentUserSubject.next(true);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    // Aquí validamos el usuario y la contraseña
    if (username === 'nasellimariana@gmail.com' && password === 'Cv7Y6mmzKecrbEc') {
      // Si son correctos, actualizamos el estado del usuario logueado
      this.currentUserSubject.next(true);
      const token = 'GENERAR_TOKEN_JWT_AQUI';
      this.cookieService.set(this.tokenKey, token);
      return this.currentUserSubject.asObservable();
    } else {
      // Si son incorrectos, retornamos un observable con valor false
      return new Observable(observer => observer.next(false));
    }
  }

  logout(): void {
    // Actualizamos el estado del usuario logueado
    this.currentUserSubject.next(false);
    this.cookieService.delete(this.tokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUserSubject.asObservable();
  }
}
