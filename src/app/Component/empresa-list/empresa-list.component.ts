import { Component, Inject, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  listaOriginal:Empresa[]=[]
  nroTotal:number
  paginador:any
  opcion:string
  buscador:string
  ruc:string
  razon:string
  tipo:string
  activado:boolean=false
  constructor(
    private route: Router,
    private rutas:ActivatedRoute,
    private empresaservicio:EmpresaService,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    this.rutas.paramMap.subscribe(params=>{
      this.paginador=null
      this.tipo=null
      var pagina: number = +params.get("page");
      if(params.get("ruc")!=null){
        const rucCode=params.get("ruc")
        this.tipo="Empresa/ruc/"+rucCode
        this.empresaservicio.getEmpresaPaginaByRUC(pagina,rucCode).subscribe((response:any)=>{
          this.empresas=response.content as Empresa[];
          if(this.empresas.length==0){
            Swal.fire('No se encontro ninguna coincidencia','Verifique los datos ingresados','info').then(result=>{
              if(result.isConfirmed){
                this.route.navigate(["Empresa/estado/Activos",0])
              }
            })

          }
          this.paginador=response;
          this.nroTotal=response.totalElements
        })
      }else if(params.get("razon")!=null){
        const razon=params.get("razon")
        this.tipo="Empresa/razonsocial/"+razon
        this.empresaservicio.getEmpresaPaginaByRazonSocial(pagina,razon).subscribe((response:any)=>{
          this.empresas=response.content as Empresa[];
          this.paginador=response;
          this.nroTotal=response.totalElements
          if(this.empresas.length==0){
            Swal.fire('No se encontro ninguna coincidencia','Verifique los datos ingresados','info').then(result=>{
              if(result.isConfirmed){
                this.route.navigate(["Empresa/estado/Activos",0])
              }
            })

          }
        })
      }else if(params.get("estado")!=null){
        const estado=params.get("estado")
        this.tipo='Empresa/estado/'+estado
        this.activado=false
        this.empresaservicio.getEmpresaPaginaByestado(pagina).subscribe((response:any)=>{
        this.empresas=response.content as Empresa[];
        this.paginador=response
        this.nroTotal=response.totalElements

      })
    }else{
        /*if(this.activado=="Mostrar Inactivos"){
          this.activado= "Ocultar Inactivos"
        }*/
        this.activado=true
        this.tipo='Empresa/page'
        this.empresaservicio.getEmpresaPagina(pagina).subscribe((response:any)=>{
        this.empresas=response.content as Empresa[];
        this.paginador=response;
        this.nroTotal=response.totalElements
      });

      }

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
    MostrarInactivos(event:any){

      if(this.activado==false){
        this.route.navigate(['/Empresa/page/',0])
        console.log(this.activado)
      }else if(this.activado==true){
        this.route.navigate(['/Empresa/estado/',"all",0])
        console.log(this.activado)
      }
    //this.activado=="Mostrar Inactivos"
    }
    Buscar(){
      if(this.opcion=="ruc"){
        this.route.navigate(['/Empresa/ruc',this.buscador,0])
      }else if(this.opcion=="razonsocial"){
        this.route.navigate(['/Empresa/razonsocial',this.buscador,0])
      }else{
        Swal.fire('Por favor escoger una de las opciones de busqueda', 'Escoger entre busqueda por ruc o razon social', 'error')

      }
      /*this.empresaservicio.getEmpresaPaginaByRUC(0,this.buscador).subscribe((response:any)=>{
        this.empresas=response.content as Empresa[];
        this.paginador=response;
      })*/
    }

    }







