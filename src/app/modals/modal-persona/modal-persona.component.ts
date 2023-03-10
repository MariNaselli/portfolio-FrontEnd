import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/clases/persona';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.component.html',
  styleUrls: ['./modal-persona.component.scss'],
})
export class ModalPersonaComponent implements OnInit {
  persona: Persona = new Persona();
  @ViewChild('modalPersona') modalPersona: any;

  constructor(
    private servicios: PortfolioService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    //this.modalService.dismissAll(); // Cerrar cualquier modal abierto
    this.sharedService.openModal().subscribe((show: boolean) => {
      if (show) {
        this.modalPersona = this.modalService.open(this.modalPersona, {
          backdrop: 'static',
          keyboard: false,
        });
      }
    });
    this.servicios.obtenerPersona().subscribe((data) => {
      this.persona = data;
    });
  }

  openModalPerfil(): void {
    this.sharedService.showModal$.next(true);
  }

  guardando: boolean = false;
  guardarCambios(content: any): void {
    this.guardando = true;

    this.servicios.actualizarPersona(this.persona).subscribe({
      next: (response) => {
        this.guardando = false;

        this.modalPersona.close();
        this.sharedService.closeModal();

        this.toastr.success('Cambios guardados exitosamente');
      },
      error: (err) => {
        this.guardando = false;
        console.error(err);
        this.toastr.error('Ocurrió un error al actualizar la persona');
      },
    });
  }

  cerrarModal() {
    this.modalPersona.close();
    this.sharedService.closeModal();
  }
}
