import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  paginador:any
  tipo:string='Conexion'
  opcion:string
  buscador:string
  nroTotal:number
  constructor(
    private route: Router,
    private conexionServicio:ConexionService,
    private rutas:ActivatedRoute,
    private dialog: MatDialog){

    }

  ngOnInit(): void {
    this.rutas.paramMap.subscribe(params=>{
      var pagina: number = +params.get("page");
      this.paginador=null
      this.tipo=null
      if(params.get("ruc")!=null){
        const rucCode=params.get("ruc")
        this.tipo="Conexion/ruc/"+rucCode
        this.conexionServicio.getConexionPaginaByRUC(pagina,rucCode).subscribe((response:any)=>{
          this.conexiones=response.content as Conexion[];
          this.paginador=response;
          this.nroTotal=response.totalElements
          if(this.conexiones.length==0){
            Swal.fire('No se encontro ninguna coincidencia','Verifique los datos ingresados','info').then(result=>{
              if(result.isConfirmed){
                this.route.navigate(["Conexion/page",0])
              }
            })

          }
        })

    }else if(params.get("razon")!=null){
      const razon=params.get("razon")
      console.log(razon)
      this.tipo="Conexion/razon/"+razon

      this.conexionServicio.getConexionPaginaByRazonSocial(pagina,razon).subscribe((response:any)=>{
        this.conexiones=response.content as Conexion[];
        this.paginador=response;
        this.nroTotal=response.totalElements
        if(this.conexiones.length==0){
          Swal.fire('No se encontro ninguna coincidencia','Verifique los datos ingresados','info').then(result=>{
            if(result.isConfirmed){
              this.route.navigate(["Conexion/page",0])
            }
          })

        }
      })
    }else{
      this.tipo='Conexion/page'
      this.conexionServicio.getConexionPagina(pagina).subscribe((response:any)=>{
      this.conexiones=response.content as Conexion[];
      this.paginador=response;
      this.nroTotal=response.totalElements;
      });
    }
  })
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
        this.conexionServicio.eliminarConexion(conexion.id).subscribe(response=>
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
    Buscar(){
      if(this.opcion=="ruc"){
        this.route.navigate(['/Conexion/ruc',this.buscador,0])
      }else if(this.opcion=="razonsocial"){
        this.route.navigate(['/Conexion/razonsocial',this.buscador,0])
      }else{
        Swal.fire('Por favor escoger una de las opciones de busqueda', 'Escoger entre busqueda por ruc o razon social', 'error')

      }

    }
}
