import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { Persona } from '../clases/persona';
import { Item } from '../clases/item';
import { environment } from 'src/environments/environment';
import { Portfolio } from '../clases/portfolio';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolioSubject = new BehaviorSubject<Portfolio>(new Portfolio());
  portfolio$ = this.portfolioSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  obtenerPortfolio(codigoPersona: number): void {
    this.loadingService.showLoading();
    this.http
      .get<Portfolio>(`${environment.apiUrlNetsJS}/portfolio/persona/${codigoPersona}`)
      .pipe(
        tap((portfolio) => {
          console.log('Portfolio obtenido:', portfolio);
          this.portfolioSubject.next(portfolio); // Actualiza el observable
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error al obtener el portfolio:', error);
        },
      });
  }

  actualizarPersona(persona: Persona): Observable<Persona> {
    this.loadingService.showLoading();
    return this.http
      .put<Persona>(`${environment.apiUrlNetsJS}/personas/actualizar-persona`, persona)
      .pipe(
        tap(() => {
          this.obtenerPortfolio(persona.codigo); // Actualiza el portfolio
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  actualizarItem(item: Item): Observable<Item> {
    this.loadingService.showLoading();
    return this.http
      .put<Item>(`${environment.apiUrlNetsJS}/items/actualizar-item/${item.codigo_item}`, item)
      .pipe(
        tap(() => {
          this.obtenerPortfolio(item.codigo_persona); // Actualiza el portfolio
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  crearItem(item: Item, codigoPersona: number): Observable<Item> {
    this.loadingService.showLoading();
    item.codigo_persona = codigoPersona;
    return this.http
      .post<Item>(`${environment.apiUrlNetsJS}/items/crear-item`, item)
      .pipe(
        tap(() => {
          this.obtenerPortfolio(codigoPersona); // Actualiza el portfolio
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  eliminarItem(codigoItem: number, codigoPersona: number): Observable<void> {
    this.loadingService.showLoading();
    return this.http
      .delete<void>(`${environment.apiUrlNetsJS}/items/eliminar-item/${codigoItem}`)
      .pipe(
        tap(() => {
          this.obtenerPortfolio(codigoPersona); // Actualiza el portfolio
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  
}
