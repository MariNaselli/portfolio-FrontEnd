import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/models/item';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-btn-editar-eliminar',
  templateUrl: './btn-editar-eliminar.component.html',
  styleUrls: ['./btn-editar-eliminar.component.scss'],
})
export class BtnEditarEliminarComponent implements OnInit {
  @Input() item!: Item;

  @ViewChild('modalItem') modalItem: any;

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
    //   this.isLoggedIn = isLoggedIn;
    // });
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¡Atención!',
      text: '¿Estás seguro de que quieres eliminar?',
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar!',
      confirmButtonColor: 'red',
      showCancelButton: true,
      cancelButtonText: 'No, cancelar',
      cancelButtonColor: 'grey',
    }).then((swal_result) => {
      if (swal_result.isConfirmed) {
        this.portfolioService.eliminarItem(this.item).subscribe(
          () => {
            Swal.fire({
              title: '¡Información!',
              text: 'Se eliminó correctamente',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: 'green',
            });

            console.log('Item eliminado correctamente.');
            // Actualizar la lista de secciones en el servicio
          },

          (error) => {
            console.log('Error al eliminar el item.', error);
            Swal.fire({
              title: 'Atención!',
              text: 'Error al eliminar el item.',
              icon: 'error',
              confirmButtonText: 'Ok',
              confirmButtonColor: 'red',
            });
          }
        );
      }
    });
  }
  cerrarModalItem() {
    this.modalItem.close();
  }
  editarItem(content: any): void {
    this.modalItem = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
}
