import { Component } from '@angular/core';
import { LoadingService } from './servicios/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading: boolean = true;

  title = 'angular-project';

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }
}
