import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/services/auth.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ToastrService } from 'ngx-toastr';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() portfolio: Portfolio = new Portfolio();
  puedeEditar: boolean = false;
  @ViewChild('modalPersona') modalPersona: any;
  // fotoSeleccionada: File | null = null;
  @ViewChild('imageCropper') imageCropper: ImageCropperComponent | undefined;
  imageChangedEvent: any = '';
  croppedImage: SafeUrl | undefined; // Cambiamos el tipo a SafeUrl para URLs sanitizadas
  croppedBlob: Blob | undefined; // Blob para enviar al backend

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private portfolioService: PortfolioService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private loadingService: LoadingService
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

  modalRef: NgbModalRef | undefined;
  openModalFoto(modalFoto: any): void {
    this.modalRef = this.modalService.open(modalFoto, {
      size: 'lg',
      centered: true,
    });
  }

  cerrarModal() {
    // this.modalService.dismissAll(); // Cierra todos los modales abiertos
    //Cerramos solo el modal al cual tenemos referencia
    this.modalRef?.close();
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event; // Asigna el evento al recortador
  }
  //metodo que se llama cuando la imagen es recortada
  imageCropped(event: ImageCroppedEvent): void {
    if (event.blob) {
      this.croppedBlob = event.blob; // Guarda el Blob
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.blob)
      );
    } else {
      this.croppedBlob = undefined;
      this.croppedImage = undefined;
    }
  }

  subirFoto(): void {
    if (!this.croppedBlob) {
      this.toastr.error(
        'Por favor selecciona y ajusta una foto antes de subirla.'
      );
      return;
    }

    const formData = new FormData();
    formData.append('foto', this.croppedBlob, 'foto.png');

    const uuidPersona = this.portfolio.persona.uuid;
    if (!uuidPersona) {
      this.toastr.error('No se pudo encontrar el UUID de la persona.');
      return;
    }

    this.loadingService.showLoading();
    this.portfolioService.subirFoto(formData, uuidPersona).subscribe({
      next: (response) => {
        this.portfolio.persona.urlFoto = response.urlFotoActualizada;
        this.portfolioService.obtenerPortfolio(uuidPersona);
        this.modalRef?.close();
        this.loadingService.hideLoading();
        this.toastr.success('Foto actualizada con éxito');
      },
      error: (err) => {
        this.loadingService.hideLoading();
        console.error('Error al subir la foto:', err);
        this.toastr.error('Ocurrió un error al actualizar la foto.');
      },
    });
  }

  //cuando la imagen es cargada correctamente
  imageLoaded(): void {
    console.log('Imagen cargada correctamente');
  }

  cropperReady(): void {
    console.log('Recortador listo');
  }

  loadImageFailed(): void {
    console.error('Error al cargar la imagen');
  }
}
