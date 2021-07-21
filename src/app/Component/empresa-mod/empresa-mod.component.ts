import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/Clases/empresa';
import { EmpresaService } from 'src/app/Servicio/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-mod',
  templateUrl: './empresa-mod.component.html',
  styleUrls: ['./empresa-mod.component.css']
})
export class EmpresaModComponent implements OnInit {

  info:string="Creacion de nuevos datos de empresa "
  empresa:Empresa=new Empresa();

  constructor(
    private route: Router,
    private empresaservicio:EmpresaService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private dialogref:MatDialogRef<EmpresaModComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: Empresa){
      empresaservicio.obtenerEmpresa(data.id).subscribe((empresa)=> this.empresa=empresa);
      
    }
  ngOnInit(): void {
   // this.cargarEmpresa();

  }
  modificarEmpresa(){

    console.log(this.empresa)

    this.empresaservicio.modificarEmpresa(this.empresa).subscribe(
      response=>{

      Swal.fire('Nueva modificacion',`Empresa modificada: ${this.empresa.nomcomercial} con exito `, 'success')
    }
    )
    this.dialogref.close();

    window.location.reload();


  }
  cancelar(){
    this.dialogref.close();
  }

}
