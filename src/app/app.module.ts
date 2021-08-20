import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpresaListComponent } from './Component/empresa-list/empresa-list.component';
import { SistemaListComponent } from './Component/sistema-list/sistema-list.component';
import { ConexionListComponent } from './Component/conexion-list/conexion-list.component';
import { ContratoListComponent } from './Component/contrato-list/contrato-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, Validators } from '@angular/forms';
import { EmpresaService } from './Servicio/empresa.service';
import { PopupComponent } from './Component/popupEmpresa/popup.component';
import {MatDialogModule} from '@angular/material/dialog';

import { PopUpSistemaComponent } from './Component/pop-up-sistema/pop-up-sistema.component';
import { PopUpConexionComponent } from './Component/pop-up-conexion/pop-up-conexion.component';
import { PopUpContratoComponent } from './Component/pop-up-contrato/pop-up-contrato.component';
import { PaginadorComponent } from './Component/paginador/paginador.component';
import { BusquedaComponent } from './Component/busqueda/busqueda.component';
import { ProgresoComponent } from './Component/progreso/progreso.component';
import { UsuarioComponent } from './component/usuario/usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpresaListComponent,
    SistemaListComponent,
    ConexionListComponent,
    ContratoListComponent,
    PopupComponent,
    PopUpSistemaComponent,
    PopUpConexionComponent,
    PopUpContratoComponent,
    PaginadorComponent,
    BusquedaComponent,
    ProgresoComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [EmpresaService ],
  bootstrap: [AppComponent ],
  entryComponents:[PopupComponent,PopUpConexionComponent,PopUpContratoComponent,PopUpSistemaComponent]
})
export class AppModule { }
