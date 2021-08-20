import { DATE } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { GraficoService} from 'src/app/Servicio/grafico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoChart } from 'src/app/Clases/info-chart';

import { Usuario } from 'src/app/Clases/usuario';
import { UsuarioService } from 'src/app/Servicio/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.css']
})
export class ProgresoComponent implements OnInit {
  InfoEmpresa:String
  FechaInicio:Date
  FechaFin:Date
  TotalInventario:number
  avanceTotal:number
  InventarioIngresado:number
  InfoBarra:any[]
  InfoTorta:any[]
  user:Usuario;
  logeo:boolean=false
  constructor(private graficoService: GraficoService,
    private route:Router,
    private userService:UsuarioService) { }

    verificar(){
      this.user= JSON.parse(localStorage.getItem("currentUser")||"{}");
      if(Object.entries(this.user).length === 0){
        this.logeo=false;
       }else{
         this.logeo=true
       }
    }
    
    logOut(){
      localStorage.removeItem("currentUser");
      this.logeo=false;
      this.route.navigate([""]);
      }
  ngOnInit(): void {
    /*this.rutas.paramMap.subscribe(params=>{
      var usuario

    });*/
    //Aqui reemplazo por los datos q ingresan, formato fecha MM/DD/YYYY
    this.verificar();
    console.log(this.logeo)
    if(this.logeo==true){
      this.user= JSON.parse(localStorage.getItem("currentUser")||"{}");
      this.InfoEmpresa=this.user.contrato.empresa.razonsocial
      this.FechaInicio=this.user.contrato.fechafincontrato
      this.FechaFin=this.user.contrato.fechainicontrato
      this.TotalInventario=this.user.contrato.cantactivos
      this.userService.getcantidadActivos(this.user.contrato.codconexion).subscribe((response:any[])=>{
        this.InventarioIngresado=response[0].nro;
        this.avanceTotal=this.InventarioIngresado/this.TotalInventario*100
      });
      this.onCreateGrafico();

    }else if(this.logeo==false){
      Swal.fire("Por favor Iniciar sesion","valide primero sus datos","warning").then(result=>{
        if(result.isConfirmed){
          console.log("HOLAAAAAA")
          this.route.navigate(['Usuario'])
        }
      });

    }


  }
  onCreateGrafico(){
    this.userService.getInfoBarra(this.user.contrato.codconexion).subscribe((response:any[])=>{
      this.InfoBarra=response
      this.graficoService.onCreateSimpleColumnChart3D(this.InfoBarra, "chartdiv");
    });
    this.userService.getInfoTorta(1).subscribe((response:any[])=>{
      this.InfoTorta=response
     this.graficoService.onCreateChartPizza(this.InfoTorta, "chartdiv2");
   });
    //this.graficoService.onCreateChartPizza(this.InfoBarra,"chartdiv2");
  }


}
