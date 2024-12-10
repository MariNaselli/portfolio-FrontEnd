import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ToastrService } from 'ngx-toastr';  

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() portfolio: Portfolio = new Portfolio();
  puedeEditar: boolean = false;
  @ViewChild('modalPersona') modalPersona: any;
  fotoSeleccionada: File | null = null;

  constructor(
    private modalService: NgbModal, 
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private toastr: ToastrService,
    

  ) {}

  ngOnInit(): void {
    // Suscribirse al observable de "esPropietarioPortfolio$"
    this.authService.esPropietarioPortfolio$().subscribe((isOwner) => {
      this.puedeEditar = isOwner;
    });
  }

  openModalPersona(content: any): void {
    this.modalPersona = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }

  cerrarModalPersona() {
    this.modalPersona.close();
  }

  openModalFoto(modalFoto: any): void {
    this.modalService.open(modalFoto, { size: 'lg', centered: true });
  }

  cerrarModal() {
    this.modalService.dismissAll();  // Cierra todos los modales abiertos
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fotoSeleccionada = input.files[0];
    }
  }
  subirFoto(): void {
    if (!this.fotoSeleccionada) {
      alert('Por favor selecciona una foto antes de subirla.');
      return;
    }
  
    const formData = new FormData();
    formData.append('foto', this.fotoSeleccionada);
  
    const uuidPersona = this.portfolio.persona.uuid;  // Asegúrate de que este uuid es el correcto
    if (!uuidPersona) {
      alert('No se pudo encontrar el UUID de la persona.');
      return;
    }
  
    // Llama al servicio para subir la foto
    this.portfolioService.subirFoto(formData, uuidPersona).subscribe({
      next: (response) => {
        // Actualiza la URL de la foto en el portfolio
        this.portfolio.persona.urlFoto = response.urlFotoActualizada;
        this.toastr.success('Foto actualizada con éxito');

        this.modalService.dismissAll();  // Cierra todos los modales abiertos
      },
      error: (err) => {
        console.error('Error al subir la foto:', err);
        this.toastr.error('Ocurrió un error al actualizar la foto.');
        
      },
    });
  }
  
  
}
