import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {
  portfolio: any;

  constructor(private servicios: PortfolioService) {}

  ngOnInit(): void {
    this.servicios.obtenerDatos().subscribe((data) => {
      this.portfolio = data;
    });
  }
}
