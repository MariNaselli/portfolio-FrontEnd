import { Persona } from './persona';
import { Seccion } from './seccion';

export class Portfolio {
  persona: Persona;
  secciones: Seccion[];

  constructor(persona: Persona = new Persona(), secciones: Seccion[] = []) {
    this.persona = persona;
    this.secciones = secciones;
  }
}
