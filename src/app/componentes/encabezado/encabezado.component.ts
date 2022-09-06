import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  constructor(private servicios:PortfolioService) { }

  ngOnInit(): void {
    this.servicios.obtenerDatos().subscribe (data => {
      //console.log(data);
    });

  }

}
