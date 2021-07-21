import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Sistema } from 'src/app/Clases/sistema';

import { SistemaService } from 'src/app/Servicio/sistema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pop-up-sistema',
  templateUrl: './pop-up-sistema.component.html',
  styleUrls: ['./pop-up-sistema.component.css']
})
export class PopUpSistemaComponent implements OnInit {
  info:string="Creacion de nuevos datos de Sistema "
  sistema:Sistema=new Sistema();
  infoBoton="Crear Datos"
  constructor(
    private route: Router,
    private sistemaServicio:SistemaService,
    private dialog: MatDialog,
    private dialogref:MatDialogRef<PopUpSistemaComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Sistema){
      if(data!=null){
        this.infoBoton="Modificar Datos";
      sistemaServicio.obtenerSistema(data.id).subscribe((Sistema)=> this.sistema=Sistema);
    }
    }
  ngOnInit(): void {


  }

  crearModificarSistema(){
    if(this.infoBoton=="Crear Datos"){
      if(this.sistema.indbaja!=null){
      console.log(this.sistema )

          this.sistemaServicio.crearSistema(this.sistema).subscribe(
            response=>{

            Swal.fire('Nueva Sistema',`Nuevo Sistema: ${this.sistema.sistema} creado con exito `, 'success')
          }
          )
          this.dialogref.close();

          window.location.reload();
        }else{
          Swal.fire('Seleccione alguna de las opciones para el estado de Sistema',"", 'error')
        }
    }else if(this.infoBoton="Modificar Datos"){
      if(this.sistema.indbaja!=null){
      Swal.fire({
        title: `Se hara el siguiente cambio de datos al sistema: ${this.sistema.sistema}`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Guardar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.sistemaServicio.modificarSistema(this.sistema).subscribe(
            response=>{
          Swal.fire('Se realizaron los cambios!', '', 'success')})
          this.dialogref.close();
          window.location.reload();
        } else if (result.isDenied) {
          Swal.fire('No se produjo ningun cambio', '', 'info')
        }
      })
    }}else{
      Swal.fire('Seleccione alguna de las opciones para el estado de Sistema',"", 'error')
    }



  }
  cancelar(){
    this.dialogref.close();
  }
}
