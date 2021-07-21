import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import{Conexion} from 'src/app/Clases/conexion';
import { ConexionService} from 'src/app/Servicio/conexion.service';
import Swal from 'sweetalert2';
import { PopUpConexionComponent } from '../pop-up-conexion/pop-up-conexion.component';

@Component({
  selector: 'app-conexion-list',
  templateUrl: './conexion-list.component.html',
  styleUrls: ['./conexion-list.component.css']
})
export class ConexionListComponent implements OnInit {

  info:string="Creacion de nuevos datos de conexion "
  conexion:Conexion=new Conexion();
  conexiones:Conexion[]=[]
  constructor(
    private route: Router,
    private conexionServicio:ConexionService,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    this.conexionServicio.getConexion().subscribe((data: Conexion[]) => {
      console.log(data);
      this.conexiones = data;
    });
    ;

  }

  AbrirPopUp(){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width="1000px";

      const dialogRef = this.dialog.open(PopUpConexionComponent, dialogConfig);
  }
  eliminar(conexion:Conexion){
    Swal.fire({
      title: 'Estas seguro de borrar? ',
      html:
    `Se borrara la conexion a <b>${conexion.bdnombre}</b>, `+
    ' para siempre',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado', '', 'success')
        this.conexionServicio.eliminarConexion(conexion.id).subscribe(response=>window.location.reload())
      } else if (result.isDenied) {
        Swal.fire('No se hizo ningun cambio','','success')
     }
    }
    )}
    modificar(conexion:Conexion){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width="1000px";
      dialogConfig.data=conexion;
      console.log(conexion);
      //this.empresaModComponent.empresa=empresa;
      const dialogRef = this.dialog.open(PopUpConexionComponent, dialogConfig);


    }
}
