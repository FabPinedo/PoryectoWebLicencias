import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conexion } from 'src/app/Clases/conexion';
import { Empresa } from 'src/app/Clases/empresa';
import { ConexionService } from 'src/app/Servicio/conexion.service';
import { EmpresaService } from 'src/app/Servicio/empresa.service';


import { SistemaService } from 'src/app/Servicio/sistema.service';
import Swal from 'sweetalert2';
import { BusquedaComponent } from '../busqueda/busqueda.component';

@Component({
  selector: 'app-pop-up-conexion',
  templateUrl: './pop-up-conexion.component.html',
  styleUrls: ['./pop-up-conexion.component.css']
})
export class PopUpConexionComponent implements OnInit {
  info:string="Creacion de nuevos datos de conexion "
  conexion:Conexion= new Conexion();
  empresas:Empresa[]=[];
  opcion:string
  buscador:string
  infoBoton="Crear"
  vacio:boolean=false
  constructor(
    private route: Router,
    private conexionService:ConexionService,
    private empresaservicio:EmpresaService,
    private dialog: MatDialog,
    private dialog2:MatDialogRef<any>,
    private dialogref:MatDialogRef<PopUpConexionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Conexion){
      if(data!=null){
        this.infoBoton="Modificar";
        conexionService.obtenerConexion(data.id).subscribe((Conexion)=> this.conexion=Conexion);
      }
    }
  ngOnInit(): void {
    this.empresaservicio.getEmpresaListadoActivos().subscribe((data: Empresa[]) => {
      console.log(data);
      this.empresas = data;
    });

  }

  crearModificarConexion(){
    if(this.infoBoton=="Crear"){
      if(parseInt(this.conexion.tomcatpuerto)>1000){
        console.log(this.conexion)
        this.conexionService.crearConexion(this.conexion).subscribe(
        response=>{
        Swal.fire('Nueva conexion',`Nuevo conexion: ${this.conexion.bdnombre} creado con exito `, 'success').then(result=>{
          if(result.isConfirmed){
            this.dialogref.close();
            window.location.reload();
          }
        })
        })
      }else{
        Swal.fire('Puerto Invalido', '', 'error')
      }
  }else if(this.infoBoton="Modificar"){
    if(parseInt(this.conexion.tomcatpuerto)>1000){
      Swal.fire({
      title: `Se hara el siguiente cambio de datos a la conexion: ${this.conexion.bdnombre}`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Guardar`,
      denyButtonText: `Cancelar`,
      }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.conexionService.modificarConexion(this.conexion).subscribe(
          response=>{
        Swal.fire('Se realizaron los cambios!', '', 'success').then(result=>{
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      })
      } else if (result.isDenied) {
        Swal.fire('No se produjo ningun cambio', '', 'info').then(result=>{
          if(result.isConfirmed){
            window.location.reload();
          }
        })
        }
      })
  }else{
    Swal.fire('Puerto Invalido', '', 'error')
  }
  }
  }
  AbrirPopUp(popup){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width="800px";
    this.dialog2=this.dialog.open(popup,dialogConfig)


    /*
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width="1000px";
    dialogConfig.data=this.conexion

    const dialogRef = this.dialog.open(BusquedaComponent, dialogConfig);*/
}
  cancelar(){
    this.dialogref.close();
  }
  Buscar(){
    if(this.opcion=="ruc"){
      this.empresas=null
      this.empresaservicio.getEmpresaByRUC(this.buscador).subscribe((data:Empresa[])=>{
        this.empresas=data
        if(this.empresas.length==0){
          this.vacio=true
        }
      })
    }else if (this.opcion=="razonsocial"){
      this.empresas=null
      this.empresaservicio.getEmpresaByRazon(this.buscador).subscribe((data:Empresa[])=>{
        this.empresas=data
        if(this.empresas.length==0){
          this.vacio=true
        }
      })
    }else{
      Swal.fire('Por favor escoger una de las opciones de busqueda', 'Escoger entre busqueda por ruc o razon social', 'error')

    }

  }
  seleccionar(empresa:Empresa){

    this.conexion.codempresa=empresa.id;
    this.dialog2.close();

  }
  resetear(){
    this.empresaservicio.getEmpresaListadoActivos().subscribe((data: Empresa[]) => {
      console.log(data);
      this.empresas = data;
    });
  }
}
