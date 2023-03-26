import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Portfolio } from 'src/app/clases/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.component.html',
  styleUrls: ['./modal-persona.component.scss'],
})
export class ModalPersonaComponent implements OnInit {
  @Output() OnCloseModal: EventEmitter<null> = new EventEmitter();

  portfolio: Portfolio = new Portfolio();

  constructor(
    private portfolioService: PortfolioService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable del servicio para actualizar el portfolio
    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
    });
  }

  guardando: boolean = false;
  guardarCambios(): void {
    this.guardando = true;

    this.portfolioService.actualizarPersona(this.portfolio.persona).subscribe({
      next: (response) => {
        this.guardando = false;
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
    this.portfolioService.refrescarPortfolio();
  }
}
