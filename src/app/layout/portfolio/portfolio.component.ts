import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { LoadingService } from 'src/app/services/loading.service';
import { PortfolioService } from 'src/app/services/portfolio.service';


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
      console.log('Portfolio recibido en el frontend:', portfolio);
      this.portfolio = portfolio;
    });

    // Captura el código desde la URL
    this.route.params.subscribe((params) => {
      const fullParam = params['uuid']; // Captura el parámetro completo
      if (fullParam) {
        // const nombre_apellido_uuid = fullParam.split('-').pop(); // Extrae el UUID de la URL
        const nombre_apellido_uuid = fullParam;
        if (nombre_apellido_uuid) {
          this.portfolioService.obtenerPortfolio(nombre_apellido_uuid); // Llama al servicio con el código extraído
        } else {
          console.error('El código de persona no es válido.');
        }
      }
    });
  }
}
