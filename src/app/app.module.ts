import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IndividualConfig, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './servicios/shared.service';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PortfolioService } from './servicios/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { BtnEditarEliminarComponent } from './buttons/btn-editar-eliminar/btn-editar-eliminar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalPersonaComponent } from './modals/modal-persona/modal-persona.component';
import { ModalLoginComponent } from './modals/modal-login/modal-login.component';
import { ModalItemComponent } from './modals/modal-item/modal-item.component';
import { SeccionesComponent } from './componentes/secciones/secciones.component';
import { LoadingComponent } from './componentes/loading/loading.component';

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
    LoadingComponent
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
    PortfolioService,
    SharedService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
