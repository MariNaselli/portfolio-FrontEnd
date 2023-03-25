import { Persona } from './persona'; // Asegúrate de tener la clase Persona en TypeScript
import { Seccion } from './seccion'; // La clase Seccion ya fue proporcionada en la pregunta

export class Portfolio {
  persona: Persona;
  secciones: Seccion[];

  constructor(persona: Persona = new Persona(), secciones: Seccion[] = []) {
    this.persona = persona;
    this.secciones = secciones;
  }
}
