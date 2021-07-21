import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Conexion } from '../Clases/conexion';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private baseUrl = "http://localhost:800/Conexion";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }
  getConexion(): Observable<Conexion[]>{
    const baseUrl1=this.baseUrl+"/find/listado"
    return this.http.get<Conexion[]>(`${baseUrl1}`);
  }


  crearConexion(conexion:Conexion): Observable<Conexion>{
    const baseUrl2=this.baseUrl+"/post"
    return this.http.post<Conexion>(baseUrl2,conexion,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e)
      }))
  }
  obtenerConexion(id: number):Observable<Conexion>{
    const baseUrl3=this.baseUrl+"/find/id/";
    return this.http.get<Conexion>(`${baseUrl3}/${id}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e)
      }))
  }
  modificarConexion(conexion:Conexion):Observable<Conexion>{
    const baseUrl4=this.baseUrl+"/find/id/";
    return this.http.put<Conexion>(`${baseUrl4}/${conexion.id}`,conexion,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e)
      }))
  }
  eliminarConexion(id: number):Observable<Conexion>{
    const baseUrl5=this.baseUrl+"/find/id"
    return this.http.delete<Conexion>(`${baseUrl5}/${id}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e)
      }))
  }
}
