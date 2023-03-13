import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Seccion } from 'src/app/clases/seccion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent implements OnInit {
  @Output() OnCloseModal: EventEmitter<null> = new EventEmitter();
  secciones: any;
  codigo_seccion_seleccionada: any;
  mostrarBarra = false;
  camposVisibles = false;
  seccionSeleccionada: any;

  constructor(private servicios: PortfolioService) {}

  ngOnInit(): void {
    this.servicios.obtenerSecciones().subscribe((data) => {
      this.secciones = data;
    });
    this.codigo_seccion_seleccionada = 0;
  }

  guardarCambios(): void {}

  cerrarModal() {
    this.OnCloseModal.emit();
  }

  ddlSeccionChange() {
    this.camposVisibles = true;
    switch (parseInt(this.codigo_seccion_seleccionada)) {
      case 0:
        this.camposVisibles = false;
        this.seccionSeleccionada = false;
        break;
      case 1:
      case 2:
      case 5:
        this.mostrarBarra = false;
        this.seccionSeleccionada = true;
        break;
      case 3:
      case 4:
        this.mostrarBarra = true;
        this.seccionSeleccionada = true;
        break;
    }
  }
}
