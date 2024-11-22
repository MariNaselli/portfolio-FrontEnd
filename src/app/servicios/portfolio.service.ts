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
  nro_persona: number = 3;
  private portfolioSubject = new BehaviorSubject<Portfolio>(new Portfolio());
  portfolio$ = this.portfolioSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  cargarPortfolioInicial(): void {
    this.loadingService.showLoading();

    this.obtenerPortfolio().subscribe({
      next: (data) => {
        this.actualizarPortfolio(data);
      },
      error: (error) => {
        console.log('Hubo un error al obtener el portfolio: ', error);
        this.loadingService.hideLoading();
      },
      complete: () => {
        this.loadingService.hideLoading();
      },
    });
  }

  obtenerPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(
      `${environment.apiUrlNetsJS}/portfolio/persona/` + this.nro_persona
    );
  }

  refrescarPortfolio(): void {
    this.obtenerPortfolio().subscribe((portfolio: Portfolio) => {
      this.portfolioSubject.next(portfolio);
    });
  }

  actualizarPersona(persona: Persona): Observable<Persona> {
    this.loadingService.showLoading();
    return this.http
      .put<Persona>(`${environment.apiUrlSpringBoot}/api/actualizar-persona`, persona)
      .pipe(
        tap(() => {
          this.refrescarPortfolio();
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  actualizarItem(item: Item): Observable<Item> {
    this.loadingService.showLoading();
    return this.http
      .put<Item>(
        `${environment.apiUrlNetsJS}/items/actualizar-item/` + item.codigo_item,
        item
      )
      .pipe(
        tap(() => {
          this.refrescarPortfolio();
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  crearItem(item: Item): Observable<Item> {
    this.loadingService.showLoading();
    item.codigo_persona = this.nro_persona;
    return this.http
      .post<Item>(`${environment.apiUrlNetsJS}/items/crear-item`, item)
      .pipe(
        tap(() => {
          this.refrescarPortfolio();
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  obtenerSecciones() {
    return this.http.get<any>(`${environment.apiUrlSpringBoot}/api/obtener-secciones`);
  }

  eliminarItem(codigo_item: number): Observable<void> {
    this.loadingService.showLoading();

    return this.http
      .delete<void>(`${environment.apiUrlNetsJS}/items/eliminar-item/` + codigo_item)
      .pipe(
        tap(() => {
          this.refrescarPortfolio();
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  actualizarPortfolio(portfolio: Portfolio): void {
    this.portfolioSubject.next(portfolio);
  }
}
