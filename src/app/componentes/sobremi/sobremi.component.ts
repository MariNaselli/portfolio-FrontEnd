import {
  Component,
  ViewChild,
  importProvidersFrom,
  OnInit,


} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/clases/persona';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.scss'],
})
export class SobremiComponent implements OnInit {
  persona: Persona = new Persona();
  @ViewChild('modalPersona') modalPersona: any;

  constructor(
    private servicios: PortfolioService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe((data) => {
      this.persona = data;
    });
  }
  guardando: boolean = false;
  guardarCambios(content: any): void {
    this.guardando = true;

    this.servicios.actualizarPersona(this.persona).subscribe({
      next: (response) => {
        console.log(response);
        this.modalPersona.close();
        this.toastr.success('Cambios guardados exitosamente');
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Ocurrió un error al actualizar la persona');
      }
    });
  }


  openModal(content: any): void {
    this.modalPersona = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }
}
