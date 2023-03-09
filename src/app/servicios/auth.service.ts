import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    // Aquí validamos el usuario y la contraseña
    if (username === 'admin' && password === 'admin') {
      // Si son correctos, actualizamos el estado del usuario logueado
      this.currentUserSubject.next(true);
      return this.currentUserSubject.asObservable();
    } else {
      // Si son incorrectos, retornamos un observable con valor false
      return new Observable(observer => observer.next(false));
    }
  }

  logout(): void {
    // Actualizamos el estado del usuario logueado
    this.currentUserSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUserSubject.asObservable();
  }
}
