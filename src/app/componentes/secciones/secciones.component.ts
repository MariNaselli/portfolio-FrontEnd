import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  secciones: Array<Seccion> = new Array<Seccion>();

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private servicios: PortfolioService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.servicios.obtenerSeccionesPorPersona().subscribe((data) => {
      this.secciones = data;
      console.log( this.secciones);
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
