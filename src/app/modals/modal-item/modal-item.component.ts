import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private servicios: PortfolioService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.servicios.obtenerSecciones().subscribe((data) => {
      this.secciones = data;
    });
    this.mostrarSegunSeccion();
  }
  guardando: boolean = false;
  guardarItem(): void {
    this.guardando = true;
    if (this.item.codigo_item == 0) {
      //ES UN ITEM NUEVO
      this.servicios.crearItem(this.item).subscribe({
        next: (response) => {
          this.OnCloseModal.emit();
          this.guardando = false;
          this.toastr.success('Item creado exitosamente');
        },
        error: (err) => {
          console.error(err);
          this.guardando = false;
          this.toastr.error('Ocurrió un error al crear el item');
        },
      });


    } else {
      //ACTUALIZAR EL ITEM PORQUE YA EXISTE, SU CÒDIGO NO ES 0
      this.servicios.actualizarItem(this.item).subscribe({
        next: (response) => {
          this.OnCloseModal.emit();
          this.guardando = false;
          this.toastr.success('Cambios guardados exitosamente');
        },
        error: (err) => {
          console.error(err);
          this.guardando = false;
          this.toastr.error('Ocurrió un error al actualizar el item');
        },
      });
    }
  }

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
