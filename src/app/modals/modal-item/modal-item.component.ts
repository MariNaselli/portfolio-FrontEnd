import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/clases/item';
import { Seccion } from 'src/app/clases/seccion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent implements OnInit {
  @Input() item: Item = new Item();
  @Output() OnCloseModal: EventEmitter<null> = new EventEmitter();
  secciones: any;
  mostrarBarra: boolean = false;
  camposVisibles = false;

  constructor(private servicios: PortfolioService) {}

  ngOnInit(): void {
    this.servicios.obtenerSecciones().subscribe((data) => {
      this.secciones = data;
    });
    this.mostrarSegunSeccion();
  }

  guardarCambios(): void {}

  cerrarModal() {
    this.OnCloseModal.emit();
  }

  mostrarSegunSeccion() {
    this.camposVisibles = true;
    switch (parseInt(this.item.codigo_seccion.toString())) {
      case 0:
        this.camposVisibles = false;
        break;
      case 1:
      case 2:
      case 5:
        this.mostrarBarra = false;
        break;
      case 3:
      case 4:
        this.mostrarBarra = true;
        break;
    }
  }
}
