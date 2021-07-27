import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conexion } from 'src/app/Clases/conexion';
import { Empresa } from 'src/app/Clases/empresa';
import { ConexionService } from 'src/app/Servicio/conexion.service';
import { EmpresaService } from 'src/app/Servicio/empresa.service';


import { SistemaService } from 'src/app/Servicio/sistema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pop-up-conexion',
  templateUrl: './pop-up-conexion.component.html',
  styleUrls: ['./pop-up-conexion.component.css']
})
export class PopUpConexionComponent implements OnInit {
  info:string="Creacion de nuevos datos de conexion "
  conexion:Conexion= new Conexion();
  empresas:Empresa[]=[];
  infoBoton="Crear"
  constructor(
    private route: Router,
    private conexionService:ConexionService,
    private empresaservicio:EmpresaService,
    private dialog: MatDialog,
    private dialogref:MatDialogRef<PopUpConexionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Conexion){
      if(data!=null){
        this.infoBoton="Modificar";
        conexionService.obtenerConexion(data.id).subscribe((Conexion)=> this.conexion=Conexion);
      }
    }
  ngOnInit(): void {
    this.empresaservicio.getEmpresa().subscribe((data: Empresa[]) => {
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
  cancelar(){
    this.dialogref.close();
  }
}
