import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/clases/item';
import { Seccion } from 'src/app/clases/seccion';
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
  items: Item[] = [];

  secciones: Array<Seccion> = new Array<Seccion>();

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });

   // Suscribirse al observable del servicio para actualizar los items
  this.portfolioService.secciones$.subscribe((secciones) => {
    this.secciones = secciones;
  });

  // Llama a obtenerSeccionesPorPersona() para cargar las secciones iniciales
  this.portfolioService.obtenerSeccionesPorPersona().subscribe((data) => {
    this.secciones = data;
    this.portfolioService.actualizarSecciones(data);
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
