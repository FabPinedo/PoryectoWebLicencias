import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{Usuario} from 'src/app/Clases/usuario';
import{UsuarioService} from'src/app/Servicio/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  codusuario:String
  contra:string
  usuario:Usuario=new Usuario();
  NuevoUsuario:Usuario
  constructor(private usuarioService:UsuarioService,
    private route: Router,) { }

  ngOnInit(): void {
  }
  ingresar(){
    console.log(this.usuario)
    this.usuarioService.validarUsuarios(this.usuario).subscribe((response:Usuario)=>{
      this.NuevoUsuario=response
      if(this.NuevoUsuario!=null){
        localStorage.setItem("currentUser",JSON.stringify(this.NuevoUsuario));
        Swal.fire('Ingreso Exitoso', '','success').then(result=>{
          if(result.isConfirmed){
            console.log("HOLAAAAAA")
            this.route.navigate(['/Progreso/usuario'])
          }
        });


      }else{
        Swal.fire('Credenciales Invalidas','', 'error')
      }
    });



  }

}
