import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import{Sistema} from 'src/app/Clases/sistema';
import { SistemaService } from 'src/app/Servicio/sistema.service';

import Swal from 'sweetalert2';
import { PopUpSistemaComponent } from '../pop-up-sistema/pop-up-sistema.component';
import { PopupComponent } from '../popupEmpresa/popup.component';

@Component({
  selector: 'app-sistema-list',
  templateUrl: './sistema-list.component.html',
  styleUrls: ['./sistema-list.component.css']
})
export class SistemaListComponent implements OnInit {
  info:string="Creacion de nuevos datos de sistemas "
  sistema: Sistema=new Sistema();
  sistemas:Sistema[]=[]
  constructor(
    private route: Router,
    private sistemaServicio:SistemaService,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    this.sistemaServicio.getSistema().subscribe((data: Sistema[]) => {
      console.log(data);
      this.sistemas= data;
    });
    ;

  }
  /*
  ngOnChanges(changes) {
    if (changes['empresa']) {
      console.log(this.empresa);

    }
  }*/
  AbrirPopUp(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width="1000px";

    const dialogRef = this.dialog.open(PopUpSistemaComponent, dialogConfig);
}
eliminar(sistema:Sistema){
  Swal.fire({
    title: 'Estas seguro de borrar? ',
    html:
  `Se borrara a la empresa <b>${sistema.sistema}</b>, `+
  ' para siempre',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: `Aceptar`,
    denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Eliminado', '', 'success')
      this.sistemaServicio.eliminarSistema(sistema.id).subscribe(response=>window.location.reload())
    } else if (result.isDenied) {
      Swal.fire('No se hizo ningun cambio','','success')
   }
  }
  )}
  modificar(sistema:Sistema){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width="1000px";
    dialogConfig.data=sistema;
    console.log(sistema);

    const dialogRef = this.dialog.open(PopUpSistemaComponent, dialogConfig);


  }


}
