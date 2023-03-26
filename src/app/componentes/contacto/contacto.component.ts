import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/clases/portfolio';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  portfolio: Portfolio = new Portfolio();

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    // Suscribirse al observable del servicio para actualizar el portfolio
    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
    });
  }
}
