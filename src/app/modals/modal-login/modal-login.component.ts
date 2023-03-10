import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/clases/persona';
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

  email = '';
  password = '';
  persona: Persona = new Persona();

  constructor(
    private servicios: PortfolioService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe((data) => {
      this.persona = data;
    });
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
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
