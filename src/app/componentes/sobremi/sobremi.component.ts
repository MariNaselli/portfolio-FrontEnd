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
    this.servicios.actualizarPersona(this.persona).subscribe(
      (response) => {
        this.guardando = false;
        console.log(response); // Muestra la respuesta del servidor
        this.modalPersona.close(); // Cierra el modal después de actualizar la persona
        this.toastr.success('Cambios guardados exitosamente'); // Muestra el mensaje Toastr
      },
      (error) => {
        this.guardando = false;
        console.log(error); // Muestra el error en la consola
        this.toastr.error('Error al guardar los cambios'); // Muestra el mensaje de error Toastr
      }
    );
  }


  openModal(content: any): void {
    this.modalPersona = this.modalService.open(content);
  }

  showSuccess() {
    this.toastr.success('¡El mensaje de éxito funciona correctamente!');
  }

}
