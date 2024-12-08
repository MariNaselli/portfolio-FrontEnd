export class Persona {
  uuid: string;
  nombre: string;
  apellido: string;
  titulo: string;
  descripcion: string;
  email: string;
  telefono: string;
  ubicacion: string;
  urlInstagram: string;
  urlGithub: string;
  urlLinkedin: string;
  contrasena: string;
  urlFoto: string;

  constructor() {
    this.uuid = '';
    this.nombre = '';
    this.apellido = '';
    this.titulo = '';
    this.descripcion = '';
    this.email = '';
    this.telefono = '';
    this.ubicacion = '';
    this.urlInstagram = '';
    this.urlGithub = '';
    this.urlLinkedin = '';
    this.contrasena = '';
    this.urlFoto = '';
  }
}
