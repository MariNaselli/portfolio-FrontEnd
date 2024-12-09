import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/models/portfolio';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() portfolio: Portfolio = new Portfolio();
  puedeEditar: boolean = false;
  @ViewChild('modalPersona') modalPersona: any;

  constructor(
    private modalService: NgbModal, 
    private authService: AuthService
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
}
