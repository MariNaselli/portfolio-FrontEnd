import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/clases/seccion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  seccion: Seccion = new Seccion;

  constructor(private servicios: PortfolioService) { }

  ngOnInit(): void {
    this.servicios.obtenerProyectos().subscribe((data) => {
      this.seccion = data;
    });
  }
}
