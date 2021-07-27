import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConexionListComponent } from './Component/conexion-list/conexion-list.component';
import { ContratoListComponent } from './Component/contrato-list/contrato-list.component';
import { EmpresaListComponent } from './Component/empresa-list/empresa-list.component';
import { SistemaListComponent } from './Component/sistema-list/sistema-list.component';

const routes: Routes = [

  { path: 'Empresa/page/:page', component: EmpresaListComponent},
  { path: 'Contrato/page/:page', component: ContratoListComponent},
  { path: 'Sistema/page/:page', component: SistemaListComponent},
  { path: 'Conexion/page/:page', component: ConexionListComponent}
/*
  { path: '/Empresa', component: EmpresaListComponent},
  { path: '/Contrato', component: ContratoListComponent},
  { path: '/Sistema', component: SistemaListComponent},
  { path: '/Conexion', component: ConexionListComponent}
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
