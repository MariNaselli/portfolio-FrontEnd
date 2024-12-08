export class Item {
  codigo_item: number;
  nombre: string;
  titulo: string;
  periodo: string;
  descripcion: string;
  url: string;
  nivel_progreso: number;
  eliminado: number;
  uuid_persona: string;
  codigo_seccion: number;

  constructor() {
    this.codigo_item = 0;
    this.nombre = '';
    this.titulo = '';
    this.periodo = '';
    this.descripcion = '';
    this.url = '';
    this.nivel_progreso = 0;
    this.eliminado = 0;
    this.uuid_persona = '';
    this.codigo_seccion = 0;
  }
}
