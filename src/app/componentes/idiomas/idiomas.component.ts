import { Component, OnInit } from '@angular/core';
import { Seccion } from 'src/app/clases/seccion';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})
export class IdiomasComponent implements OnInit {
  seccion: Seccion = new Seccion;

  constructor(private servicios: PortfolioService) { }

  ngOnInit(): void {
    this.servicios.obtenerIdiomas().subscribe((data) => {
      this.seccion = data;
    });
  }

}
