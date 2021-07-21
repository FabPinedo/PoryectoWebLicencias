
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/Clases/empresa';
import { EmpresaService } from 'src/app/Servicio/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  info:string="Creacion de nuevos datos de empresa "
  empresa:Empresa=new Empresa();
  infoBoton="Crear Datos"
  constructor(
    private route: Router,
    private empresaservicio:EmpresaService,
    private dialog: MatDialog,

    private dialogref:MatDialogRef<PopupComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Empresa){
      if(data!=null){
        this.infoBoton="Modificar Datos";
        empresaservicio.obtenerEmpresa(data.id).subscribe((Empresa)=> this.empresa=Empresa);

      }
    }
  ngOnInit(): void {


  }

  crearModificarEmpresa(){
    if(this.infoBoton=="Crear Datos"){
    console.log(this.empresa)
      if(parseInt(this.empresa.codigoruc)>10000000000){
        if(this.empresa.indbaja!=null){
            if(this.empresa.fechabaja!=null){
              this.empresaservicio.crearEmpresa(this.empresa).subscribe(
                response=>{

                Swal.fire('Nueva Empresa Cliente',`Nueva empresa cliente: ${this.empresa.nomcomercial} creado con exito `, 'success')
              }
              )
              this.dialogref.close();

              window.location.reload();
            }else{
              Swal.fire('Escoja una fecha', "",'error')
            }
        }else{
          Swal.fire('Seleccione alguna de las opciones para el estado de la empresa',"", 'error')
        }

      }else{
        Swal.fire('Escriba un ruc valido',"", 'error')
        }


  }else if(this.infoBoton="Modificar Datos"){

    if(parseInt(this.empresa.codigoruc)>10000000000){
      if(this.empresa.indbaja!=null){
          if(this.empresa.fechabaja!=null){
           //Aqui va la magia
           Swal.fire({
            title: `Se hara el siguiente cambio de datos al sistema: ${this.empresa.nomcomercial}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Guardar`,
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.empresaservicio.modificarEmpresa(this.empresa).subscribe(
                response=>{
              Swal.fire('Se realizaron los cambios!', '', 'success')})
              this.dialogref.close();
              window.location.reload();
            } else if (result.isDenied) {
              Swal.fire('No se produjo ningun cambio', '', 'info')
            }
          })
          }else{
            Swal.fire('Escoja una fecha', "",'error')
          }
      }else{
        Swal.fire('Seleccione alguna de las opciones para el estado de la empresa',"", 'error')
      }

    }else{
      Swal.fire('Escriba un ruc valido',"", 'error')
      }




    }




  }
  cancelar(){
    this.dialogref.close();
  }

}
