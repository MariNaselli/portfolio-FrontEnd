import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/clases/portfolio';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent implements OnInit {
  portfolio: Portfolio = new Portfolio();
  isLoggedIn: boolean = false;

  @ViewChild('modalLogin') modalLogin: any;
  @ViewChild('modalPersona') modalPersona: any;
  @ViewChild('navbar') navbar!: ElementRef;

  constructor(
    private portfolioService: PortfolioService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    // Suscribirse al observable del servicio para actualizar el portfolio
    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
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
  cerrarMenu() {
    if (this.navbar.nativeElement.classList.contains('show')) {
      this.navbar.nativeElement.classList.remove('show');
    }
  }
}
