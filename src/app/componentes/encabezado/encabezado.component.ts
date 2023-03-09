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
  email = '';
  password = '';
  isLoggedIn: boolean = false;
  @ViewChild('modalLogin') modalLogin: any;
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

  openModal(content: any): void {
    this.modalLogin = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  login(): void {
    this.authService.login(this.email, this.password);
    this.modalLogin.close();
  }
  logout(): void {
    this.authService.logout();
  }
}
