import { Component } from '@angular/core';
import { Portfolio } from './clases/portfolio';
import { LoadingService } from './servicios/loading.service';
//import { LoadingService } from './servicios/loading.service';
import { PortfolioService } from './servicios/portfolio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}
