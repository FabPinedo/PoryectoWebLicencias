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
  opcion:string
  buscador:string
  nroTotal:number
  activado:boolean=false
  constructor(
    private route: Router,
    private contratoServicio:ContratoService,
    private rutas:ActivatedRoute,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    this.rutas.paramMap.subscribe(params=>{
      this.paginador=null
      this.tipo=null
      var pagina: number = +params.get("page");
      if(params.get("ruc")!=null){
        const rucCode=params.get("ruc")
        this.tipo="Contrato/ruc/"+rucCode
        this.contratoServicio.getContratoPaginaByRUC(pagina,rucCode).subscribe((response:any)=>{
          this.contratos=response.content as Contrato[];
          this.paginador=response;
          this.nroTotal=response.totalElements
          if(this.contratos.length==0){
            Swal.fire('No se encontro ninguna coincidencia','Verifique los datos ingresados','info').then(result=>{
              if(result.isConfirmed){
               this.route.navigate(["Contrato/estado/Activos",0])
              }
            })

          }
        })
      }else if(params.get("razon")!=null){
        const razon=params.get("razon")
        this.tipo="Contrato/razonsocial/"+razon
        this.contratoServicio.getContratoPaginaByRazonSocial(pagina,razon).subscribe((response:any)=>{
          this.contratos=response.content as Contrato[];
          this.paginador=response;
          this.nroTotal=response.totalElements
          if(this.contratos.length==0){
            Swal.fire('No se encontro ninguna coincidencia','Verifique los datos ingresados','info').then(result=>{
              if(result.isConfirmed){
                this.route.navigate(["Contrato/estado/Activos",0])
              }
            })

          }
        })
      }else if(params.get("estado")!=null){
        const estado=params.get("estado")
        this.tipo='Contrato/estado/'+estado
        this.activado=false
        this.contratoServicio.getContratoPaginaByestado(pagina).subscribe((response:any)=>{
        this.contratos=response.content as Contrato[];
        this.paginador=response
        this.nroTotal=response.totalElements

      })
    }else{
        /*if(this.activado=="Mostrar Inactivos"){
          this.activado= "Ocultar Inactivos"
        }*/
        this.activado=true
        this.tipo='Contrato/page'
        this.contratoServicio.getContratoPagina(pagina).subscribe((response:any)=>{
        this.contratos=response.content as Contrato[];
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
    Buscar(){
      if(this.opcion=="ruc"){
        this.route.navigate(['/Contrato/ruc',this.buscador,0])
      }else if(this.opcion=="razonsocial"){
        this.route.navigate(['/Contrato/razonsocial',this.buscador,0])
      }else{
        Swal.fire('Por favor escoger una de las opciones de busqueda', 'Escoger entre busqueda por ruc o razon social', 'error')

      }

    }
    MostrarInactivos(event:any){
      if(this.activado==true){
        this.route.navigate(['/Contrato/page/',0])
        console.log(this.activado)
      }else if(this.activado==false){
        this.route.navigate(['/Contrato/estado/',"all",0])
        console.log(this.activado)
      }
    }

}
