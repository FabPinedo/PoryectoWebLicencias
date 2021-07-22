import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Conexion } from 'src/app/Clases/conexion';
import { ConexionService } from 'src/app/Servicio/conexion.service';


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
  infoBoton="Crear Datos"
  constructor(
    private route: Router,
    private conexionService:ConexionService,
    private dialog: MatDialog,
    private dialogref:MatDialogRef<PopUpConexionComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Conexion){
      if(data!=null){
        this.infoBoton="Modificar Datos";
        conexionService.obtenerConexion(data.id).subscribe((Conexion)=> this.conexion=Conexion);
      }
    }
  ngOnInit(): void {
    ;

  }

  crearModificarConexion(){
    if(this.infoBoton=="Crear Datos"){
      if(parseInt(this.conexion.tomcatpuerto)>1000){
        console.log(this.conexion)
        this.conexionService.crearConexion(this.conexion).subscribe(
        response=>{
        Swal.fire('Nueva conexion',`Nuevo conexion: ${this.conexion.bdnombre} creado con exito `, 'success')
        })
        this.dialogref.close();
        window.location.reload();
      }else{
        Swal.fire('Puerto Invalido', '', 'error')
      }
  }else if(this.infoBoton="Modificar Datos"){
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
        Swal.fire('Se realizaron los cambios!', '', 'success')})
        window.location.reload();
      } else if (result.isDenied) {
        Swal.fire('No se produjo ningun cambio', '', 'info')
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
