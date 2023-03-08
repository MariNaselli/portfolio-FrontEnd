import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { Persona } from 'src/app/clases/persona';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.scss'],
})
export class SobremiComponent implements OnInit {
  persona: Persona = new Persona();
  modalRef: any;

  constructor(private servicios: PortfolioService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe((data) => {
      this.persona = data;
    });
  }

  guardarCambios(content: any): void {
    this.servicios.actualizarPersona(this.persona).subscribe((response) => {
      console.log(response); // Muestra la respuesta del servidor
      this.modalRef.close(); // Cierra el modal después de actualizar la persona
    });
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content);
  }
}
