
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/Clases/empresa';
import { EmpresaService } from 'src/app/Servicio/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html'
})
export class PopupComponent implements OnInit {
  info:string="Creacion de nuevos datos de empresa "
  empresa:Empresa=new Empresa();
  infoBoton="Crear"
  constructor(
    private route: Router,
    private empresaservicio:EmpresaService,
    private dialog: MatDialog,

    private dialogref:MatDialogRef<PopupComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Empresa){
      if(data!=null){
        this.infoBoton="Modificar";
        empresaservicio.obtenerEmpresa(data.id).subscribe((Empresa)=> this.empresa=Empresa);

      }
    }
  ngOnInit(): void {


  }

  crearModificarEmpresa(){
    if(this.infoBoton=="Crear"){
      if(parseInt(this.empresa.codigoruc)>10000000000){
        this.empresa.indbaja=false;
        this.empresa.fechabaja=null;
        this.empresaservicio.crearEmpresa(this.empresa).subscribe(
          response=>{
          Swal.fire('Nueva Empresa Cliente',`Nueva empresa cliente: ${this.empresa.nomcomercial} creado con exito `, 'success')
          })
          this.dialogref.close();
          window.location.reload();
      }else{
        Swal.fire('Escriba un ruc valido',"", 'error')
        }
  }else if(this.infoBoton="Modificar"){
    if(parseInt(this.empresa.codigoruc)>10000000000){
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
          Swal.fire('No se produjo ningun cambio', '', 'info').then(result=>{
            if(result.isConfirmed){
             window.location.reload()
            }
          })
          }
        })
    }else{
      Swal.fire('Escriba un ruc valido',"", 'error')
      }
    }
  }
  cancelar(){
    this.dialogref.close();
  }

}
