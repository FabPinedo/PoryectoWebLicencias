
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit,OnChanges {
@Input() paginador:any;
@Input() tipo:String;
paginas:number[]
desde:number;
hasta:number;
categoria:string;
criterio:string;
  constructor(
    private route:Router
  ) { }

  ngOnInit(): void {
    this.calculoPaginas();
    /*if(this.tipo=="empresaRuc"){
      this.categoria="Empresa"
      this.criterio="ruc"
    }*/
  }
  ngOnChanges(cambios:SimpleChanges){
    console.log(this.tipo)
    let paginadorActual=cambios['paginador'];
    if(paginadorActual.previousValue){
      this.calculoPaginas();
    }

  }
  calculoPaginas(){

     this.desde=Math.min(Math.max(1,this.paginador.number-3),this.paginador.totalPages-4);
    this.hasta=Math.max(Math.min(this.paginador.totalPages,this.paginador.number+3),5);
    if(this.paginador.totalPages>5){
       this.paginas= new Array(this.hasta-this.desde+1).fill(0).map((_valor,indice)=>indice+this.desde);

    }else{
      this.paginas= new Array(this.paginador.totalPages).fill(0).map((_valor,indice)=>indice+1);
    }
  }
/*
  Moverpagina(pagina:number){
    this.route.navigate([this.tipo,pagina])
  }
*/
goToPage(pagina:number){
  this.route.navigate([this.tipo,pagina]);
}
}
