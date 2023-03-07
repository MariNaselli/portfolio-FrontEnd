import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/clases/seccion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experienciaprofesional',
  templateUrl: './experienciaprofesional.component.html',
  styleUrls: ['./experienciaprofesional.component.scss']
})
export class ExperienciaprofesionalComponent implements OnInit {
  portfolio:any;

  constructor(private servicios: PortfolioService) { }
  seccion: Seccion = new Seccion;

  ngOnInit(): void {
    this.servicios.obtenerExperiencia().subscribe((data) => {
      this.seccion = data;
    });
  }
}


