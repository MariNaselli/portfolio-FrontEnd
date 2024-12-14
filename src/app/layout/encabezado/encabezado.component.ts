import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Router } from '@angular/router';
import { UtilidadesService } from 'src/app/utils/utilidades.service';
import { ToastrService } from 'ngx-toastr';
import { Portfolio } from 'src/app/models/portfolio';
import { ModalUserComponent } from 'src/app/components/modals/modal-user/modal-user.component';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent implements OnInit {
  portfolio: Portfolio = new Portfolio();
  isLoggedIn: boolean = false;
  userData: any;

  @ViewChild('modalLogin') modalLogin: any;
  // @ViewChild('modalPersona') modalPersona: any;
  @ViewChild('modalUser') modalUser: any;

  @ViewChild('navbar') navbar!: ElementRef;
  modalRef: any;

  constructor(
    private portfolioService: PortfolioService,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private utilidadesService: UtilidadesService  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((userData) => {
      if (userData) {
        this.isLoggedIn = true;
        this.userData = userData;
      } else {
        this.isLoggedIn = false;
      }
    });

    // Suscribirse al observable del servicio para actualizar el portfolio
    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
      if (this.portfolio.persona.uuid === this.userData.uuid) {
        this.userData = {
          ...this.userData, // Mantener los datos anteriores de userData
          nombre: this.portfolio.persona.nombre,
          apellido: this.portfolio.persona.apellido,
        };
      }
    });
  }

  openModalLogin(content: any): void {
    this.modalLogin = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
    this.cerrarMenu();
  }

  cerrarModalLogin() {
    this.modalLogin.close();
  }

  openModalUser(): void {
    //aca obtener portfolio por el uuid del usuario logueado
    this.modalRef = this.modalService.open(this.modalUser, {
      size: 'sm',
      centered: true,
    });
  }

  cerrarModalUser(): void {
    this.modalService.dismissAll();
  }

  logout(): void {
    this.authService.logout();
  }
  cerrarMenu() {
    if (this.navbar.nativeElement.classList.contains('show')) {
      this.navbar.nativeElement.classList.remove('show');
    }
  }

  // Método para desplazar a una sección
  irASeccion(fragment: string): void {
    fragment = this.utilidadesService.generarSlug(fragment);
    this.cerrarMenu();
    this.router
      .navigate([], {
        fragment, // Define el fragmento de la URL (e.g., "section_2")
      })
      .then(() => {
        const elemento = document.getElementById(fragment);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
  }

  // openModalCurrentUser() {
  //   this.toastr.info(
  //     'Mostrar modal con los datos basicos del usuario logueado. Nombre, Apellido y Correo Electronico'
  //   );
  // }
}
