import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilidadesService {
  constructor() {}

  /**
   * Convierte una cadena a un formato slug:
   * - Minúsculas
   * - Sin acentos ni caracteres especiales
   * - Espacios reemplazados por guiones medios
   * @param texto Cadena de entrada
   * @returns Cadena transformada al formato slug
   */
  generarSlug(texto: string): string {
    return texto
      .toLowerCase() // Convierte a minúsculas
      .normalize('NFD') // Descompone caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
      .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales excepto guiones y espacios
      .trim() // Elimina espacios al inicio y al final
      .replace(/\s+/g, '-'); // Reemplaza espacios con guiones medios
  }
}
