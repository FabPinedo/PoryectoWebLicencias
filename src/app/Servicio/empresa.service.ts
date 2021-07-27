import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../Clases/empresa';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl = "http://localhost:800/Empresa";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) {

  }

  getEmpresa(): Observable<Empresa[]>{
    const baseUrl1=this.baseUrl+"/find/listado";
    return this.http.get<Empresa[]>(`${baseUrl1}`);
  }
  getEmpresaPagina(page:number): Observable<Empresa[]>{
    const baseUrl1=this.baseUrl+"/find/page";
    return this.http.get<Empresa[]>(`${baseUrl1}/${page}`);
  }


  crearEmpresa(empresa:Empresa): Observable<Empresa>{
    const baseUrl2=this.baseUrl+"/post";
    return this.http.post<Empresa>(baseUrl2,empresa,{headers:this.cabezera}).pipe(
      catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  obtenerEmpresa(id: number):Observable<Empresa>{
    const baseUrl3=this.baseUrl+"/find/id";
    return this.http.get<Empresa>(`${baseUrl3}/${id}`).pipe(catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  modificarEmpresa(empresa:Empresa):Observable<Empresa>{
    const baseUrl4=this.baseUrl+"/find/id";
    return this.http.put<Empresa>(`${baseUrl4}/${empresa.id}`,empresa,{headers:this.cabezera}).pipe(catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
  eliminarEmpresa(id: number):Observable<Empresa>{
    const baseUrl5=this.baseUrl+"/find/id/";
    return this.http.delete<Empresa>(`${baseUrl5}/${id}`).pipe(catchError(e=>{
      console.log(e)
      Swal.fire(e.error.Mensaje,e.error.error,"error" );
      return throwError(e)
    })
    )
  }
}
