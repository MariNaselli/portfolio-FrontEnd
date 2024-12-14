import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
})
export class PortfolioListComponent {
  portfolios: any[] = [];
  filteredPortfolios: any[] = [];
  searchQuery: string = '';

  constructor(
    private portfolioService: PortfolioService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.portfolioService.limpiarPorfolio();

    this.loadingService.showLoading();
    this.portfolioService.listarPortfolios().subscribe({
      next: (data) => {
        this.portfolios = data;
        this.filteredPortfolios = this.portfolios;
        this.loadingService.hideLoading();
      },
      error: (err) => {
        this.loadingService.hideLoading();
        console.error('Error al cargar portfolios:', err);
      },
    });
  }

  applyFilter(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPortfolios = this.portfolios.filter(
      (portfolio) =>
        portfolio.nombre?.toLowerCase().includes(query) ||
        '' ||
        portfolio.apellido?.toLowerCase().includes(query) ||
        '' ||
        portfolio.titulo?.toLowerCase().includes(query) ||
        ''
    );
  }
}
