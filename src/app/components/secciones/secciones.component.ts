import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/services/auth.service';
import { UtilidadesService } from 'src/app/utils/utilidades.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss'],
})
export class SeccionesComponent implements OnInit {
  @Input() portfolio: Portfolio = new Portfolio();
  @ViewChild('modalItem') modalItem: any;
  isLoggedIn = false;
  puedeEditar: boolean = false;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    public utilidadesService: UtilidadesService
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable de "esPropietarioPortfolio$"
    this.authService.esPropietarioPortfolio$().subscribe((isOwner) => {
      this.puedeEditar = isOwner;
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
