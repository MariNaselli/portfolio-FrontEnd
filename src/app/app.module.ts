import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IndividualConfig, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './servicios/shared.service';

import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { SobremiComponent } from './componentes/sobremi/sobremi.component';
import { ExperienciaprofesionalComponent } from './componentes/experienciaprofesional/experienciaprofesional.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { PortfolioService } from './servicios/portfolio.service';
import { HttpClientModule } from '@angular/common/http';
import { IdiomasComponent } from './componentes/idiomas/idiomas.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { BtnEditarEliminarComponent } from './buttons/btn-editar-eliminar/btn-editar-eliminar.component';
import { BtnAgregarComponent } from './buttons/btn-agregar/btn-agregar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalPersonaComponent } from './modals/modal-persona/modal-persona.component';
import { ModalLoginComponent } from './modals/modal-login/modal-login.component';
import { ModalItemComponent } from './modals/modal-item/modal-item.component';
import { SeccionesComponent } from './componentes/secciones/secciones.component';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    SobremiComponent,
    ExperienciaprofesionalComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    IdiomasComponent,
    ContactoComponent,
    BtnEditarEliminarComponent,
    BtnAgregarComponent,
    ModalPersonaComponent,
    ModalLoginComponent,
    ModalItemComponent,
    SeccionesComponent
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
