import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';


@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {
  portfolios: any[] = [];
  filteredPortfolios: any[] = [];
  searchQuery: string = '';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.listarPortfolios().subscribe({
      next: (data) => {
        console.log('Datos cargados:', data); // Verifica los datos
        this.portfolios = data;
        
        this.filteredPortfolios = this.portfolios; // Inicializa el filtro con todos los portfolios
      },
      error: (err) => {
        console.error('Error al cargar portfolios:', err);
      },
    });
  }

  applyFilter(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPortfolios = this.portfolios.filter(portfolio =>
      (portfolio.nombre?.toLowerCase().includes(query) || '') ||
      (portfolio.apellido?.toLowerCase().includes(query) || '') ||
      (portfolio.titulo?.toLowerCase().includes(query) || '')
    );
  }
}

