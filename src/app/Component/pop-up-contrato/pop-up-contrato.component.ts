import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conexion } from 'src/app/Clases/conexion';
import { Contrato } from 'src/app/Clases/contrato';
import { Empresa } from 'src/app/Clases/empresa';
import { Sistema } from 'src/app/Clases/sistema';
import { ConexionService } from 'src/app/Servicio/conexion.service';
import { ContratoService } from 'src/app/Servicio/contrato.service';
import { EmpresaService } from 'src/app/Servicio/empresa.service';
import { SistemaService } from 'src/app/Servicio/sistema.service';
import Swal from 'sweetalert2';
import { BusquedaComponent } from '../busqueda/busqueda.component';

@Component({
  selector: 'app-pop-up-contrato',
  templateUrl: './pop-up-contrato.component.html',
  styleUrls: ['./pop-up-contrato.component.css']
})
export class PopUpContratoComponent implements OnInit {

  info:string="Creacion de nuevos datos de Contrato "
  contrato:Contrato=new Contrato();
  empresas:Empresa[]=[];
  sistemas:Sistema[]=[];
  conexiones:Conexion[]=[];
  infoBoton="Crear"
  opcion:string
  buscador:string
  conexionHabilitar:boolean=true
  vacio:boolean=false
  constructor(
    private route: Router,
    private contratoService:ContratoService,
    private empresaservicio:EmpresaService,
    private sistemaservicio:SistemaService,
    private conexionservicio:ConexionService,
    private dialog: MatDialog,
    private dialog2:MatDialogRef<any>,
    private dialogref:MatDialogRef<PopUpContratoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Contrato){
      if(data!=null){
        this.infoBoton="Modificar";
      contratoService.obtenerContrato(data.id).subscribe((Contrato)=> this.contrato=Contrato);
    }
    }
  ngOnInit(): void {
    this.empresaservicio.getEmpresaListadoActivos().subscribe((data: Empresa[]) => {
      console.log(data);
      this.empresas = data;
    });
    this.sistemaservicio.getSistemaListadoActivo().subscribe((data: Sistema[]) => {
      console.log(data);
      this.sistemas = data;
    });
    this.conexionservicio.getConexion().subscribe((data: Conexion[]) => {
      console.log(data);
      this.conexiones = data;
    });

  }


  crearModificarcontrato(){
    if(this.infoBoton=="Crear"){
      if(this.contrato.estado!=null){
        if(this.contrato.fechafincontrato>this.contrato.fechainicontrato){
          if(parseInt(this.contrato.token)>100000){
            console.log("FUNCIONA")
            this.contratoService.crearContrato(this.contrato).subscribe(
            response=>{
            console.log(this.contrato)
            Swal.fire('Nueva Contrato realizado',`Numero de contrato: ${this.contrato.id} creado con exito `, 'success').then(result=>{
              if(result.isConfirmed){
                this.dialogref.close();
                window.location.reload();
              }
            })

            })
          }else{
            Swal.fire('El token no es valido',"", 'error')
            }
        }else{
          Swal.fire('Seleccione fechas validas, la fecha de inicio no puede ser mayor a la fecha fin ',"", 'error')
        }
    }else{
      Swal.fire('Seleccione alguna de las opciones para el estado del Contrato',"", 'error')
    }
    }else if(this.infoBoton="Modificar"){
      if(this.contrato.estado!=null){
        if(this.contrato.fechafincontrato>this.contrato.fechainicontrato){
            Swal.fire({
            title: `Se hara el siguiente cambio de datos del contrato: ${this.contrato.id}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Guardar`,
            denyButtonText: `Cancelar`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.contratoService.modificarContrato(this.contrato).subscribe(
                response=>{
              Swal.fire('Se realizaron los cambios!', '', 'success').then(result=>{
                if(result.isConfirmed){
                  this.dialogref.close();
                  window.location.reload();
                }
              })
            })

            }else if (result.isDenied) {
              Swal.fire('No se produjo ningun cambio', '', 'info').then(result=>{
                if(result.isConfirmed){
                  window.location.reload();
                }
              })
            }
            })
        }else{
          Swal.fire('Seleccione fechas validas, la fecha de inicio no puede ser mayor a la fecha fin ',"", 'error')
          }
      }else{
        Swal.fire('Seleccione alguna de las opciones para el estado del Contrato',"", 'error')
     }

  }
}
AbrirPopUp(popup){
  const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width="800px";
    this.dialog2=this.dialog.open(popup,dialogConfig)
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
      }
      )
    }else{
      Swal.fire('Por favor escoger una de las opciones de busqueda', 'Escoger entre busqueda por ruc o razon social', 'error')

    }


  }
  seleccionar1(empresa:Empresa){
    this.contrato.codempresa=empresa.id
    this.dialog2.close();
    this.conexionHabilitar=false
    console.log(this.conexionHabilitar)
    this.conexionservicio.getConexionbyIDEmpresa(empresa.id).subscribe((data:Conexion[])=>
this.conexiones=data
    );


  }
  seleccionar2(sistema:Sistema){
    this.contrato.codsistema=sistema.id
    this.dialog2.close();

  }
  resetear(){
    this.empresaservicio.getEmpresaListadoActivos().subscribe((data: Empresa[]) => {
      console.log(data);
      this.empresas = data;
    });
  }

}
