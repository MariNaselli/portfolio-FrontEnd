import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.scss'],
})
export class SobremiComponent implements OnInit {
  portfolio: any;

  constructor(private servicios: PortfolioService) {}

  ngOnInit(): void {
    this.servicios.obtenerDatos().subscribe((data) => {
      this.portfolio = data;
    });
  }
}
