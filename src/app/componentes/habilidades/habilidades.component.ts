import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/clases/seccion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {
  seccion: Seccion = new Seccion;

  constructor(private servicios: PortfolioService) { }

  ngOnInit(): void {
    this.servicios.obtenerHabilidades().subscribe((data) => {
      this.seccion = data;
    });
  }

}
