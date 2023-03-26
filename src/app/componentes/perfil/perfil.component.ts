import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/clases/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  portfolio: Portfolio = new Portfolio();

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    // Suscribirse al observable del servicio para actualizar los items
    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
    });
  }
}
