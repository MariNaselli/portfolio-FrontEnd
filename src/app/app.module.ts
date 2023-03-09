import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { IndividualConfig, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { LoginComponent } from './modals/login/login.component';
import { RedesComponent } from './modals/redes/redes.component';
import { BtnEditarEliminarComponent } from './buttons/btn-editar-eliminar/btn-editar-eliminar.component';
import { BtnAgregarComponent } from './buttons/btn-agregar/btn-agregar.component';
import { ModalAgregarEditarComponent } from './modals/modal-agregar-editar/modal-agregar-editar.component';
import { ModalEliminarComponent } from './modals/modal-eliminar/modal-eliminar.component';
import { ModalEditarSobreMiComponent } from './modals/modal-editar-sobre-mi/modal-editar-sobre-mi.component';
import { BtnIngresarComponent } from './buttons/btn-ingresar/btn-ingresar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    LoginComponent,
    RedesComponent,
    ModalEliminarComponent,
    ModalAgregarEditarComponent,
    BtnEditarEliminarComponent,
    BtnAgregarComponent,
    ModalEditarSobreMiComponent,
    BtnIngresarComponent,
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
