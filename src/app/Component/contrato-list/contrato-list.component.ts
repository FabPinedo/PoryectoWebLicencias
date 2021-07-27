import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Conexion } from 'src/app/Clases/conexion';
import{Contrato} from 'src/app/Clases/contrato';
import { Empresa } from 'src/app/Clases/empresa';
import { Sistema } from 'src/app/Clases/sistema';
import { ContratoService } from 'src/app/Servicio/contrato.service';
import Swal from 'sweetalert2';
import { PopUpContratoComponent } from '../pop-up-contrato/pop-up-contrato.component';

@Component({
  selector: 'app-contrato-list',
  templateUrl: './contrato-list.component.html',
  styleUrls: ['./contrato-list.component.css']
})
export class ContratoListComponent implements OnInit {

  info:string="Creacion de nuevos datos de contratos "
  empresa:Empresa;
  sistema:Sistema;
  conexion:Conexion;
  contrato:Contrato=new Contrato();
  contratos:Contrato[]=[]
  paginador:any
  tipo:string='Contrato'
  constructor(
    private route: Router,
    private contratoServicio:ContratoService,
    private rutas:ActivatedRoute,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    this.rutas.paramMap.subscribe(params=>{
      console.log(params)
      var pagina: number = +params.get("page");
      console.log(pagina)
    this.contratoServicio.getContratoPagina(pagina).subscribe((response:any)=>{
      this.contratos=response.content as Contrato[];
      this.paginador=response;
      });
  })


  }

  AbrirPopUp(){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width="1000px";

      const dialogRef = this.dialog.open(PopUpContratoComponent, dialogConfig,);
  }
  eliminar(contrato:Contrato){
    Swal.fire({
      title: 'Estas seguro de borrar? ',
      html:
    `Se borrara El contrato de ID:  <b>${contrato.id}</b>, `+
    ' para siempre',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Aceptar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.contratoServicio.eliminarContrato(contrato.id).subscribe(response=>
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
    modificar(contrato:Contrato){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width="1000px";
      dialogConfig.data=contrato;
      console.log(contrato);
      //this.empresaModComponent.empresa=empresa;
      const dialogRef = this.dialog.open(PopUpContratoComponent, dialogConfig);



    }
    checkValue(event:any,contrato:Contrato){
      Swal.fire({
        title: 'Estas seguro de cambiar el estado? ',
        html:
      `Se cambiara el contrato de ID: <b>${contrato.id}</b> `+
      '<b>!</b>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          this.contratoServicio.modificarContrato(contrato).subscribe(response=>{
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

}
