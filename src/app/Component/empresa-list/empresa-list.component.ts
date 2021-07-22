import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import{Empresa} from 'src/app/Clases/empresa';
import { EmpresaService } from 'src/app/Servicio/empresa.service';

import Swal from 'sweetalert2';

import { PopupComponent } from '../popupEmpresa/popup.component';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html'
})
export class EmpresaListComponent implements OnInit {
  info:string="Creacion de nuevos datos de empresa "
  empresa:Empresa=new Empresa();
  empresas:Empresa[]=[]
  constructor(
    private route: Router,
    private empresaservicio:EmpresaService,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    this.empresaservicio.getEmpresa().subscribe((data: Empresa[]) => {
      console.log(data);
      this.empresas = data;
    });


  }

  AbrirPopUp(){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width="1000px";

      const dialogRef = this.dialog.open(PopupComponent, dialogConfig);
  }
  eliminar(empresa:Empresa){
    Swal.fire({
      title: 'Estas seguro de borrar? ',
      html:
    `Se borrara a la empresa <b>${empresa.nomempresa}</b>, `+
    ' para siempre',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminado', '', 'success')
        this.empresaservicio.eliminarEmpresa(empresa.id).subscribe(response=>window.location.reload())
      } else if (result.isDenied) {
        Swal.fire('No se hizo ningun cambio','','success')
     }
    }
    )}
    modificar(empresa:Empresa){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width="1000px";
      dialogConfig.data=empresa;
      console.log(empresa);
      //this.empresaModComponent.empresa=empresa;
      const dialogRef = this.dialog.open(PopupComponent, dialogConfig);


    }
  }




