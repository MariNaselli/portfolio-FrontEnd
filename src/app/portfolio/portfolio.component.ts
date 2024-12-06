import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../servicios/loading.service';
import { PortfolioService } from '../servicios/portfolio.service';
import { Portfolio } from '../clases/portfolio';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  loading: boolean = false;
  isEditable: boolean = false; // Bandera que indica si se pueden editar los campos
  portfolio: Portfolio = new Portfolio();

  constructor(
    private loadingService: LoadingService,
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Observa el estado de carga
    this.loadingService.loading$.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    });

    this.portfolioService.portfolio$.subscribe((portfolio) => {
      this.portfolio = portfolio;
    });

    // Captura el código desde la URL
    this.route.params.subscribe((params) => {
      const fullParam = params['nombre-apellido-codigo']; // Captura el parámetro completo
      if (fullParam) {
        const codigo = +fullParam.split('-').pop(); // Extrae el número al final (3 en este caso)
        if (codigo) {
          this.portfolioService.obtenerPortfolio(codigo); // Llama al servicio con el código extraído
        } else {
          console.error('El código de persona no es válido.');
        }
      }
    });
  }
}
