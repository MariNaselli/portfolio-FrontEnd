import {
  Component,
  OnInit,
} from '@angular/core';
import { Persona } from 'src/app/clases/persona';
import { LoadingService } from 'src/app/servicios/loading.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  persona: Persona = new Persona();

  constructor(
    private servicios: PortfolioService,
    private loading: LoadingService
    ) {}

  ngOnInit(): void {
    this.servicios.obtenerPersona().subscribe({
      next: (data) => {
        this.persona = data;
      },
      error: (error) => {
        console.log('Hubo un error al obtener la persona: ', error);
      },
      complete: () => {
        this.loading.hideLoading();
      }
    });
  }
}
