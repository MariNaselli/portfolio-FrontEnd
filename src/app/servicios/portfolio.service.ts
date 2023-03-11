import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../clases/persona';
import { Seccion } from '../clases/seccion';
import { Item } from '../clases/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  nro_persona: number = 1;

  constructor(private http: HttpClient) {}

  obtenerPersona(): Observable<Persona> {
    return this.http.get<Persona>(`${environment.apiUrl}/api/obtener-persona/`+ this.nro_persona);
  }

  actualizarPersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${environment.apiUrl}/api/actualizar-persona`, persona);
  }

  obtenerSecciones(){
    return this.http.get<any>(`${environment.apiUrl}/api/obtener-secciones`);
  }

  obtenerPortfolio(): Observable<any> {
    return this.http.get('./assets/data/data.json');
  }

  obtenerExperiencia(): Observable<any> {
    return this.http.get<Seccion>(`${environment.apiUrl}/api/seccion/1/persona/` + this.nro_persona);
  }

  obtenerEducacion(): Observable<any> {
    return this.http.get<Seccion>(`${environment.apiUrl}/api/seccion/2/persona/` + this.nro_persona);
  }

  obtenerHabilidades(): Observable<any> {
    return this.http.get<Seccion>(`${environment.apiUrl}/api/seccion/3/persona/` + this.nro_persona);
  }

  obtenerIdiomas(): Observable<any> {
    return this.http.get<Seccion>(`${environment.apiUrl}/api/seccion/4/persona/` + this.nro_persona);
  }

  obtenerProyectos(): Observable<any> {
    return this.http.get<Seccion>(`${environment.apiUrl}/api/seccion/5/persona/` + this.nro_persona);
  }
}
