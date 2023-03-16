import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-btn-editar-eliminar',
  templateUrl: './btn-editar-eliminar.component.html',
  styleUrls: ['./btn-editar-eliminar.component.scss'],
})
export class BtnEditarEliminarComponent implements OnInit {
  @Input() codigoItem!: number;
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
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
        this.portfolioService.eliminarItem(this.codigoItem).subscribe(
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
          }

        );
      }
    });
  }
}
