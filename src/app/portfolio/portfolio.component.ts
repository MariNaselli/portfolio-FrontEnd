import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../servicios/loading.service';
import { PortfolioService } from '../servicios/portfolio.service';
import { Portfolio } from '../clases/portfolio';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  loading: boolean = true;
  
  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    // Observa el estado de carga
    this.loadingService.loading$.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    });

    // Captura el código desde la URL
    this.route.params.subscribe((params) => {
      const codigo = +params['codigo']; // Convierte el parámetro a número
      this.portfolioService.obtenerPortfolio(codigo);
    });
  }
}
