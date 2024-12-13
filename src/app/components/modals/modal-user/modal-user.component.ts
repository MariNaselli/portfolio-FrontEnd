import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
  @Input() userData: any;

  constructor(private modalService: NgbModal, private router: Router) {}

  cerrarModal(): void {
    this.modalService.dismissAll();
  }

  redireccionarPerfil(): void {
    this.router.navigate([`/portfolio/${this.userData.uuid}`]);
    this.cerrarModal();
  }
}
