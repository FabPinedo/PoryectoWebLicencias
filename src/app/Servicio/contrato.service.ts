import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Contrato } from '../Clases/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private baseUrl = "http://localhost:800/Contrato";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }
  getContrato(): Observable<Contrato[]>{
    const baseUrl1=this.baseUrl+"/find/listado"
    return this.http.get<Contrato[]>(`${baseUrl1}`);
  }
  getContratoPagina(page:number): Observable<Contrato[]>{
    const baseUrl1=this.baseUrl+"/find/page";
    return this.http.get<Contrato[]>(`${baseUrl1}/${page}`);
  }
  getContratoPaginaByestado(page:number): Observable<Contrato[]>{
    const baseUrl1=this.baseUrl+"/find/estado/page";
    return this.http.get<Contrato[]>(`${baseUrl1}/${page}`);
  }
  
  getContratoPaginaByRUC(page:number,ruc:string): Observable<Contrato[]>{
    const baseUrl1=this.baseUrl+"/find/ruc";
    return this.http.get<Contrato[]>(`${baseUrl1}/${ruc}/${page}`);
  }

  getContratoPaginaByRazonSocial(page:number,razon:string): Observable<Contrato[]>{
    const baseUrl1=this.baseUrl+"/find/razonsocial";
    return this.http.get<Contrato[]>(`${baseUrl1}/${razon}/${page}`);
  }


  crearContrato(contrato:Contrato): Observable<Contrato>{
    const baseUrl2=this.baseUrl+"/post"
    return this.http.post<Contrato>(baseUrl2,contrato,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      }));

  }
  obtenerContrato(id: number):Observable<Contrato>{
    const baseUrl3=this.baseUrl+"/find/id/";
    return this.http.get<Contrato>(`${baseUrl3}/${id}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      }));
  }
  modificarContrato(contrato:Contrato):Observable<Contrato>{
    const baseUrl4=this.baseUrl+"/find/id/";
    return this.http.put<Contrato>(`${baseUrl4}/${contrato.id}`,contrato,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      }));
  }
  eliminarContrato(id: number):Observable<Contrato>{
    const baseUrl5=this.baseUrl+"/find/id"
    return this.http.delete<Contrato>(`${baseUrl5}/${id}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      }));
  }
}
