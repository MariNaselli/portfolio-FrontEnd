import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
})
export class ModalLoginComponent {
  @Output() OnCloseModal: EventEmitter<null> = new EventEmitter();
  isLoading: boolean = false;
  activeTab: 'login' | 'signup' = 'login';
  canLogin = false;
  canSignup = false;

  email = '';
  password = '';
  nombre = '';
  apellido = '';
  emailSignup = '';
  passwordSignup = '';
  passwordRepeatSignup = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  updateLoginButton() {
    this.canLogin = this.email.trim() !== '' && this.password.trim() !== '';
  }

  updateSignupButton() {
    this.canSignup =
      this.nombre.trim() !== '' &&
      this.apellido.trim() !== '' &&
      this.emailSignup.trim() !== '' &&
      this.passwordSignup.trim() !== '' &&
      this.passwordRepeatSignup.trim() !== '' &&
      this.passwordSignup.trim() == this.passwordRepeatSignup.trim();
  }

  login(): void {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          this.OnCloseModal.emit();
          this.toastr.success('Ingreso correcto');
        } else {
          this.toastr.error('Los datos ingresados no son correctos');
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.toastr.error('Error en el servidor');
      },
    });
  }

  signup(): void {
    const newUser = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.emailSignup,
      password: this.passwordSignup
    };
    this.authService.signup(newUser).subscribe({
      next: () => {
        this.toastr.success('Cuenta creada exitosamente');
        this.setActiveTab('login'); // Cambiar a la pestaña de login tras registrarse
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Error al crear la cuenta');
      },
    });
  }

  cerrarModal() {
    this.OnCloseModal.emit();
  }

  setActiveTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
  }
}
