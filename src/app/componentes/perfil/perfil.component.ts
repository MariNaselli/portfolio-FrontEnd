import { Component, OnInit, ViewChild } from '@angular/core';
import { Portfolio } from 'src/app/clases/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  portfolio: Portfolio = new Portfolio();

  @ViewChild('modalPersona') modalPersona: any;

  constructor(private portfolioService: PortfolioService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable del servicio para actualizar los items
    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
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

