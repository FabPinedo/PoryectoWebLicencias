import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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
  paginador:any
  tipo:string='Empresa'
  constructor(
    private route: Router,
    private rutas:ActivatedRoute,
    private empresaservicio:EmpresaService,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    /*this.empresaservicio.getEmpresa().subscribe((data: Empresa[]) => {
      console.log(data);
      this.empresas = data;
    });*/
    this.rutas.paramMap.subscribe(params=>{
      console.log(params)
      var pagina: number = +params.get("page");
      console.log(pagina)
      this.empresaservicio.getEmpresaPagina(pagina).subscribe((response:any)=>{
      this.empresas=response.content as Empresa[];
      this.paginador=response;
      });

    })


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
        this.empresaservicio.eliminarEmpresa(empresa.id).subscribe(response=>
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
    checkValue(event:any,empresa:Empresa){
      Swal.fire({
        title: 'Estas seguro de cambiar el estado? ',
        html:
      `Se se cambiara el estado a la empresa <b>${empresa.nomempresa}</b> `+
      '<b>!</b>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if(empresa.indbaja==true){
            empresa.fechabaja=new Date();
          this.empresaservicio.modificarEmpresa(empresa).subscribe(response=>{
             Swal.fire('Cambio realizado con Exito!', '', 'success').then(result=>{
               if(result.isConfirmed){
                window.location.reload()
               }
             })
            })
          }else{
            empresa.fechabaja=null;
            console.log(empresa)
            this.empresaservicio.modificarEmpresa(empresa).subscribe(response=>{
               Swal.fire('Cambio realizado con Exito!', '', 'success').then(result=>{
                 if(result.isConfirmed){
                  window.location.reload()
                 }
               })
              })

          }
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






