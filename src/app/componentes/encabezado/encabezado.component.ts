import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/clases/portfolio';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Router } from '@angular/router';
import { UtilidadesService } from 'src/app/utils/utilidades.service';
import { ToastrService } from 'ngx-toastr';

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
  @ViewChild('navbar') navbar!: ElementRef;

  constructor(
    private portfolioService: PortfolioService,
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private utilidadesService: UtilidadesService,
    private toastr: ToastrService
  ) {}

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

  openModalCurrentUser() {
    this.toastr.info('Mostrar modal con los datos basicos del usuario logueado. Nombre, Apellido y Correo Electronico');
  }
}
