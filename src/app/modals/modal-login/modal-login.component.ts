import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Portfolio } from 'src/app/clases/portfolio';
import { AuthService } from 'src/app/servicios/auth.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent implements OnInit {
  @Output() OnCloseModal: EventEmitter<null> = new EventEmitter();

  isLoggedIn: boolean = false;
  canLogin: boolean = false;

  email = '';
  password = '';
  portfolio: Portfolio = new Portfolio();

  constructor(
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    // Suscribirse al observable del servicio para actualizar el portfolio
    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
    });
  }

  updateLoginButton() {
    this.canLogin = this.email.trim() !== '' && this.password.trim() !== '';
  }

  login(): void {
    this.authService.login(this.email, this.password);
    if (this.isLoggedIn) {
      this.OnCloseModal.emit();
      this.toastr.success('Ingreso correcto');
    } else {
      this.toastr.error('Los datos ingresados no son correctos');
    }
  }
  cerrarModal() {
    this.OnCloseModal.emit();
  }
}
