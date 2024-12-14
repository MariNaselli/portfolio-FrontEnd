import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean = false;
  
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
  }

}
