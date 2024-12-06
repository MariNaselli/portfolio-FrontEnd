import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './layout/portfolio/portfolio.component';

const routes: Routes = [
  { path: 'portfolio/:nombre-apellido-codigo', component: PortfolioComponent },
  { path: '', component: PortfolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
