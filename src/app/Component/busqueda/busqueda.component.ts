import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Empresa } from 'src/app/Clases/empresa';
import { EmpresaService } from 'src/app/Servicio/empresa.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit, OnChanges {
  info:string="Creacion de nuevos datos de empresa "
  empresa:Empresa=new Empresa();
  empresas:Empresa[]=[]
  paginador:any
  tipo:string='Empresa'
  opcion:string
  buscador:string
  cambio:boolean=false
  constructor(private dialogref:MatDialogRef<BusquedaComponent>,
    private empresaservicio:EmpresaService) { }

  ngOnInit(): void {
    /*this.empresaservicio.getEmpresaPagina(0).subscribe((response:any)=>{
      this.empresas=response.content as Empresa[];
      this.paginador=response;
      });*/
    this.empresaservicio.getEmpresa().subscribe((data:Empresa[])=>this.empresas=data);
    console.log(this.empresas)
  }
  ngOnChanges(cambios:SimpleChanges){
    console.log(cambios)
    if(cambios.cambio.currentValue!=cambios.cambio.previousValue){
      console.log("cambio ocurre")
    }

  }
  Buscar(){
    if(this.opcion=="ruc"){
      this.empresas=null
      this.empresaservicio.getEmpresaByRUC(this.buscador).subscribe((data:Empresa[])=>
        this.empresas=data
      )
    }else if (this.opcion=="razonsocial"){
      this.empresas=null
      this.empresaservicio.getEmpresaByRazon(this.buscador).subscribe((data:Empresa[])=>
        this.empresas=data
      )


    }





  }
  seleccionar(empresa:Empresa){


  }

}
