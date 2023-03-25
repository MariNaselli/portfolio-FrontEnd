import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/clases/portfolio';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss'],
})
export class SeccionesComponent implements OnInit {

  @ViewChild('modalItem') modalItem: any;
  isLoggedIn = false;

  portfolio: Portfolio = new Portfolio();

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private portfolioService: PortfolioService
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
  nuevoItem(content: any): void {
    this.modalItem = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  cerrarModalItem() {
    this.modalItem.close();
  }
}
