import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  infoBoton="Crear Datos"
  constructor(
    private route: Router,
    private contratoService:ContratoService,
    private empresaservicio:EmpresaService,
    private sistemaservicio:SistemaService,
    private conexionservicio:ConexionService,
    private dialog: MatDialog,
    private dialogref:MatDialogRef<PopUpContratoComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Contrato){
      if(data!=null){
        this.infoBoton="Modificar Datos";
      contratoService.obtenerContrato(data.id).subscribe((Contrato)=> this.contrato=Contrato);
    }
    }
  ngOnInit(): void {
    this.empresaservicio.getEmpresa().subscribe((data: Empresa[]) => {
      console.log(data);
      this.empresas = data;
    });
    this.sistemaservicio.getSistema().subscribe((data: Sistema[]) => {
      console.log(data);
      this.sistemas = data;
    });
    this.conexionservicio.getConexion().subscribe((data: Conexion[]) => {
      console.log(data);
      this.conexiones = data;
    });

  }

  crearModificarcontrato(){
    if(this.infoBoton=="Crear Datos"){
      if(this.contrato.estado!=null){
        if(this.contrato.fechafincontrato>this.contrato.fechainicontrato){
          if(parseInt(this.contrato.token)>100000){
            console.log("FUNCIONA")
            this.contratoService.crearContrato(this.contrato).subscribe(
            response=>{
            console.log(this.contrato)
            Swal.fire('Nueva Contrato realizado',`Numero de contrato: ${this.contrato.id} creado con exito `, 'success')
            this.dialogref.close()
            window.location.reload()
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
    }else if(this.infoBoton="Modificar Datos"){
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
              Swal.fire('Se realizaron los cambios!', '', 'success')})
              this.dialogref.close();
              window.location.reload();
            }else if (result.isDenied) {
              Swal.fire('No se produjo ningun cambio', '', 'info')
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
  cancelar(){
    this.dialogref.close();
  }

}
