import {
  Component,
  OnInit,
} from '@angular/core';
import { Persona } from 'src/app/clases/persona';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-sobremi',
  templateUrl: './sobremi.component.html',
  styleUrls: ['./sobremi.component.scss'],
})
export class SobremiComponent implements OnInit {
  persona: Persona = new Persona();

  constructor(private servicios: PortfolioService) {}

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe((data) => {
      this.persona = data;
    });
  }
}
