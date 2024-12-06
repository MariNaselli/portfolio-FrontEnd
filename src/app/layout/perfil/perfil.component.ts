import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Portfolio } from 'src/app/models/portfolio';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  @Input() portfolio: Portfolio = new Portfolio();

  @ViewChild('modalPersona') modalPersona: any;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

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
