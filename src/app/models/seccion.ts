import { Item } from "./item";

export class Seccion {
  codigo_seccion: number;
  nombre_seccion: string;
  orden: number;
  items: Item[];

  constructor() {
    this.codigo_seccion = 0;
    this.nombre_seccion = '';
    this.orden = 0;
    this.items = [];
  }
}
