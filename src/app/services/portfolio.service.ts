import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap, finalize, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Persona } from "../models/persona";
import { Portfolio } from "../models/portfolio";
import { Seccion } from "../models/seccion";
import { LoadingService } from "./loading.service";
import { Item } from "../models/item";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolioSubject = new BehaviorSubject<Portfolio>(new Portfolio());
  portfolio$ = this.portfolioSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  obtenerPortfolio(uuid: string): void {
    this.loadingService.showLoading();
    this.http
      .get<Portfolio>(`${environment.apiUrlNetsJS}/portfolio/persona/${uuid}`)
      .pipe(
        tap((portfolio) => {
          this.portfolioSubject.next(portfolio); // Actualiza el observable
          this.authService.verificarPropietarioPortfolio(uuid); // Verifica el propietario
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

  limpiarPorfolio(){
    this.portfolioSubject.next(new Portfolio());
  }
  

  actualizarPersona(persona: Persona): Observable<Persona> {
    this.loadingService.showLoading();
    return this.http
      .put<Persona>(`${environment.apiUrlNetsJS}/personas/actualizar-persona`, persona)
      .pipe(
        tap(() => {
          this.obtenerPortfolio(persona.uuid); // Actualiza el portfolio
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  actualizarItem(item: Item): Observable<Item> {
    this.loadingService.showLoading();
    return this.http
      .put<Item>(`${environment.apiUrlNetsJS}/items/actualizar-item/${item.uuid_item}`, item)
      .pipe(
        tap(() => {
          this.obtenerPortfolio(item.uuid_persona); // Actualiza el portfolio
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  crearItem(item: Item): Observable<Item> {
    this.loadingService.showLoading();
    return this.http
      .post<Item>(`${environment.apiUrlNetsJS}/items/crear-item`, item)
      .pipe(
        tap(() => {
          this.obtenerPortfolio(item.uuid_persona); // Actualiza el portfolio
        }),
        finalize(() => {
          this.loadingService.hideLoading();
        })
      );
  }

  eliminarItem(item: Item): Observable<void> {
    this.loadingService.showLoading();
    return this.http
      .delete<void>(`${environment.apiUrlNetsJS}/items/eliminar-item/${item.uuid_item}`)
      .pipe(
        tap(() => {
          // Actualiza el estado local eliminando el ítem directamente
          const updatedPortfolio = { ...this.portfolioSubject.value };
          updatedPortfolio.secciones = updatedPortfolio.secciones.map((seccion) => {
            return {
              ...seccion,
              items: seccion.items.filter((i) => i.uuid_item !== item.uuid_item),
            };
          });
          this.portfolioSubject.next(updatedPortfolio); // Notifica el cambio
        }),
        finalize(() => this.loadingService.hideLoading())
      );
  }
  

  obtenerSecciones(): Observable<Seccion[]> {
    return this.http
      .get<Seccion[]>(`${environment.apiUrlNetsJS}/secciones/obtener-secciones`)
      .pipe(
        tap((secciones) => {
        }),
        finalize(() => {
        })
      );
  }

  subirFoto(formData: FormData, uuid: string): Observable<any> {
    return this.http.post(`${environment.apiUrlNetsJS}/personas/${uuid}/foto`, formData);
  }

  listarPortfolios(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrlNetsJS}/portfolio/listar-portfolios`);
  }
  
}
