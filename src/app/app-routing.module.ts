import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './layout/portfolio/portfolio.component';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';
// import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';

const routes: Routes = [
  { path: 'portfolio-list', component: PortfolioListComponent },
  { path: 'portfolio/:uuid', component: PortfolioComponent },
  { path: '', redirectTo: '/portfolio-list', pathMatch: 'full' } // Redirección por defecto
  // { path: '', component: PortfolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
