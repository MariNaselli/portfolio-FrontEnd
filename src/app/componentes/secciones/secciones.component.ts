import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/clases/portfolio';
import { UtilidadesService } from 'src/app/utils/utilidades.service';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss'],
})
export class SeccionesComponent {
  @Input() portfolio: Portfolio = new Portfolio();
  @ViewChild('modalItem') modalItem: any;
  isLoggedIn = false;

  constructor(
    private modalService: NgbModal,
    public utilidadesService: UtilidadesService
  ) {}

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
