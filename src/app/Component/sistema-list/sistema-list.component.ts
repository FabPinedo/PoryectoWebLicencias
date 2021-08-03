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
  paginador:any
  tipo:string='Sistema'
  activado:boolean= false
  nroTotal:number

  constructor(
    private route: Router,
    private sistemaServicio:SistemaService,
    private rutas:ActivatedRoute,
    private dialog: MatDialog){

    }


  ngOnInit(): void {
    this.rutas.paramMap.subscribe(params=>{
      console.log(params)
      var pagina: number = +params.get("page");
      if(params.get("estado")!=null){
        const estado=params.get("estado")
        this.tipo='Sistema/estado/'+estado
        this.activado=false
        this.sistemaServicio.getSistemaPaginaByestado(pagina).subscribe((response:any)=>{
        this.sistemas=response.content as Sistema[];
        this.paginador=response
        this.nroTotal=response.totalElements

      })
    }else{
      this.activado=true
      this.tipo='Sistema/page'
      this.sistemaServicio.getSistemaPagina(pagina).subscribe((response:any)=>{
      this.sistemas=response.content as Sistema[];
      this.paginador=response;
      this.nroTotal=response.totalElements
      });
    }
  })
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
      this.sistemaServicio.eliminarSistema(sistema.id).subscribe(response=>
        Swal.fire('Eliminado', '', 'success').then(result=>{
          if(result.isConfirmed){
           window.location.reload()
          }
        })
        )


    } else if (result.isDenied) {
      Swal.fire('No se hizo ningun cambio','','success').then(result=>{
        if(result.isConfirmed){
         window.location.reload()
        }
      })
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
  checkValue(event:any,sistema:Sistema){
    Swal.fire({
      title: 'Estas seguro de cambiar el estado? ',
      html:
    `Se cambiara el estado al sistema <b>${sistema.sistema}</b> `+
    '<b>!</b>',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.sistemaServicio.modificarSistema(sistema).subscribe(response=>{
           Swal.fire('Cambio realizado con Exito!', '', 'success').then(result=>{
             if(result.isConfirmed){
              window.location.reload()
             }
           })
          })
      } else if (result.isDenied) {
        Swal.fire('No se hizo ningun cambio','','success').then(result=>{
          if(result.isConfirmed){
           window.location.reload()
          }
        })
     }
    })
  }
  MostrarInactivos(event:any){

    if(this.activado==false){
      this.route.navigate(['/Sistema/page/',0])
    }else if(this.activado==true){
      this.route.navigate(['/Sistema/estado/',"all",0])
    }
  //this.activado=="Mostrar Inactivos"
  }


}
