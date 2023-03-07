import { Item } from "./item";

export class Seccion {
  codigo: number;
  nombre: string;
  orden: number;
  items: Item[];

  constructor() {
    this.codigo = 0;
    this.nombre = '';
    this.orden = 0;
    this.items = [];
  }
}
