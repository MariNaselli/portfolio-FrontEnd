import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Persona } from '../clases/persona';
import { Seccion } from '../clases/seccion';
import { Item } from '../clases/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  nro_persona: number = 3;
  private seccionesSubject = new BehaviorSubject<Seccion[]>([]);
  secciones$ = this.seccionesSubject.asObservable();

  constructor(private http: HttpClient) {}

  obtenerPersona(): Observable<Persona> {
    return this.http.get<Persona>(
      `${environment.apiUrl}/api/obtener-persona/` + this.nro_persona
    );
  }

  actualizarPersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(
      `${environment.apiUrl}/api/actualizar-persona`,
      persona
    );
  }

  actualizarItem(item: Item): Observable<Item> {
    return this.http.put<Item>(
      `${environment.apiUrl}/api/actualizar-item/` + item.codigo_item,
      item
    );
  }
  crearItem(item: Item): Observable<Item> {
    item.codigo_persona = this.nro_persona;
    return this.http.post<Item>(
      `${environment.apiUrl}/api/crear-item`,
      item
    );
  }

  obtenerSecciones() {
    return this.http.get<any>(`${environment.apiUrl}/api/obtener-secciones`);
  }

  obtenerSeccionesPorPersona() {
    return this.http.get<any>(
      `${environment.apiUrl}/api/obtener-secciones/` + this.nro_persona
    );
  }

  eliminarItem(codigo_item: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/eliminar-item/` + codigo_item).pipe(
      tap(() => {
        // Obtener el arreglo actual de secciones
        const secciones = this.seccionesSubject.getValue();

        // Buscar la seccion que contiene el item a eliminar
        const seccionConItem = secciones.find((seccion) =>
          seccion.items.some((item) => item.codigo_item === codigo_item)
        );

        if (seccionConItem) {
          // Eliminar el item de la lista de items de la seccion
          seccionConItem.items = seccionConItem.items.filter(
            (item) => item.codigo_item !== codigo_item
          );

          // Actualizar el arreglo de secciones en el BehaviorSubject
          this.seccionesSubject.next(secciones);
        }
      })
    );
  }

  actualizarSecciones(secciones: Seccion[]): void {
    this.seccionesSubject.next(secciones);
  }

}
