import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss'],
})
export class SeccionesComponent implements OnInit {

  @ViewChild('modalItem') modalItem: any;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {

  }
  nuevoItem(content: any): void {
    this.modalItem = this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
  cerrarModalItem() {
    this.modalItem.close();
  }
}
