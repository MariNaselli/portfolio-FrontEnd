import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/clases/persona';
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
