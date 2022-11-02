import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experienciaprofesional',
  templateUrl: './experienciaprofesional.component.html',
  styleUrls: ['./experienciaprofesional.component.scss']
})
export class ExperienciaprofesionalComponent implements OnInit {
  portfolio:any;

  constructor(private servicios: PortfolioService) { }

  ngOnInit(): void {
    this.servicios.obtenerDatos().subscribe((data) => {
      this.portfolio = data;
    });
  }

}