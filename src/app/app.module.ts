import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PortfolioService } from './services/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BtnEditarEliminarComponent } from './components/btn-editar-eliminar/btn-editar-eliminar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalItemComponent } from './components/modals/modal-item/modal-item.component';
import { ModalLoginComponent } from './components/modals/modal-login/modal-login.component';
import { ModalPersonaComponent } from './components/modals/modal-persona/modal-persona.component';
import { ContactoComponent } from './layout/contacto/contacto.component';
import { EncabezadoComponent } from './layout/encabezado/encabezado.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PortfolioComponent } from './layout/portfolio/portfolio.component';
import { SeccionesComponent } from './components/secciones/secciones.component';
import { PortfolioNoEncontradoComponent } from './components/portfolio-no-encontrado/portfolio-no-encontrado.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PerfilComponent,
    ContactoComponent,
    BtnEditarEliminarComponent,
    ModalPersonaComponent,
    ModalLoginComponent,
    ModalItemComponent,
    SeccionesComponent,
    LoadingComponent,
    PortfolioComponent,
    PortfolioNoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [
    PortfolioService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
