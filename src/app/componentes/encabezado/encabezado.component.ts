import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/clases/persona';
import { Seccion } from 'src/app/clases/seccion';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent implements OnInit {

  persona: Persona = new Persona();
  isLoggedIn: boolean = false;
  secciones: Array<Seccion> = new Array<Seccion>();

  @ViewChild('modalLogin') modalLogin: any;
  @ViewChild('modalPersona') modalPersona: any;

  constructor(
    private servicios: PortfolioService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe((data) => {
      this.persona = data;
    });
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.servicios.obtenerSeccionesPorPersona().subscribe((data) => {
      this.secciones = data;
    });
  }

  openModalLogin(content: any): void {
    this.modalLogin = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  openModalPersona(content: any): void {
    this.modalPersona = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  cerrarModalPersona() {
    this.modalPersona.close();
  }
  cerrarModalLogin() {
    this.modalLogin.close();
  }
  logout(): void {
    this.authService.logout();
  }
}
