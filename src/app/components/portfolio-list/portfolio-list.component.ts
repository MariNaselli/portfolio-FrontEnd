import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { RouterModule } from '@angular/router'; // Importa esto

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {
  portfolios: any[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.listarPortfolios().subscribe({
      next: (data) => {
        this.portfolios = data;
        console.log('Portfolios cargados:', this.portfolios);
      },
      error: (err) => {
        console.error('Error al cargar portfolios:', err);
      },
    });
  }
}

