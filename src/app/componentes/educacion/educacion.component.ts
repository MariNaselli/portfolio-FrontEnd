import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/clases/seccion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.scss']
})
export class EducacionComponent implements OnInit {
  seccion: Seccion = new Seccion;

  constructor(private servicios: PortfolioService) {}

  ngOnInit(): void {
    this.servicios.obtenerEducacion().subscribe((data) => {
      this.seccion = data;
    });
  }
}
