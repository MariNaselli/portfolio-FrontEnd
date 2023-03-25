import { Component } from '@angular/core';
import { Portfolio } from './clases/portfolio';
import { LoadingService } from './servicios/loading.service';
//import { LoadingService } from './servicios/loading.service';
import { PortfolioService } from './servicios/portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  portfolio: Portfolio = new Portfolio();
  loading: boolean = true;

  title = 'angular-project';

  constructor(
    private loadingService: LoadingService,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    });
    this.portfolioService.cargarPortfolioInicial();
  }
}
