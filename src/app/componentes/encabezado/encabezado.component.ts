import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  persona:any;

  constructor(private servicios:PortfolioService) { }

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe (data => {
      this.persona = data
    });

  }

}

