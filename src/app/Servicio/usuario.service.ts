import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conexion } from '../Clases/conexion';
import { Contrato } from '../Clases/contrato';

import { Usuario } from '../Clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = "http://localhost:8080/InfoUser";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  info:any[]
  constructor(private http: HttpClient) {
  }


  validarUsuarios(usuario:Usuario):Observable<Usuario>{
    const baseUrl1="http://localhost:8080/User"
    return this.http.get<Usuario>(`${baseUrl1}/${usuario.codusuario}/${usuario.despassword}`);
  }

  /*GetContrato(usuario:Usuario):Observable<Contrato[]>{
    const baseUrl1=this.baseUrl+"/Contrato"
    return this.http.get<Contrato[]>(`${baseUrl1}/${usuario.codcontrato}`);
  }*/
  getcantidadActivos(id:number): Observable<any[]>{
    const baseUrl1=this.baseUrl+"/cantInventariado"
    return this.http.get<any[]>(`${baseUrl1}/${id}`);
  }
  getInfoTorta(id:number): Observable<any[]>{
    const baseUrl1=this.baseUrl+"/Torta"
    return this.http.get<any[]>(`${baseUrl1}/${id}`);
  }
  getInfoBarra(id:number): Observable<any[]>{
    const baseUrl1=this.baseUrl+"/Barra"
    return this.http.get<any[]>(`${baseUrl1}/${id}`);
  }

}
