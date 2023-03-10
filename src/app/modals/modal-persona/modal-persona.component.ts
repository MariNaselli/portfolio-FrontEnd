import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @Output() OnCloseModal: EventEmitter<null> = new EventEmitter();

  persona: Persona = new Persona();

  constructor(
    private servicios: PortfolioService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe((data) => {
      this.persona = data;
    });
  }

  guardando: boolean = false;
  guardarCambios(): void {
    this.guardando = true;

    this.servicios.actualizarPersona(this.persona).subscribe({
      next: (response) => {
        this.guardando = false;
       //this.sharedService.closeModal();

        this.OnCloseModal.emit();

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
    this.OnCloseModal.emit();
  }
}
