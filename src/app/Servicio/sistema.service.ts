import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Sistema } from '../Clases/sistema';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {
  private baseUrl = "http://localhost:800/Sistema";
  private cabezera= new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }
  getSistema(): Observable<Sistema[]>{
    const baseUrl1=this.baseUrl+"/find/listado"
    return this.http.get<Sistema[]>(`${baseUrl1}`);
  }


  crearSistema(sistema:Sistema): Observable<Sistema>{
    const baseUrl2=this.baseUrl+"/post";
    return this.http.post<Sistema>(baseUrl2,sistema,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )

  }
  obtenerSistema(id: number):Observable<Sistema>{
    const baseUrl3=this.baseUrl+"/find/id/";
    return this.http.get<Sistema>(`${baseUrl3}/${id}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )
  }
  modificarSistema(sistema:Sistema):Observable<Sistema>{
    const baseUrl4=this.baseUrl+"/find/id/";
    return this.http.put<Sistema>(`${baseUrl4}/${sistema.id}`,sistema,{headers:this.cabezera}).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )
  }
  eliminarSistema(id: number):Observable<Sistema>{
    const baseUrl5=this.baseUrl+"/find/id/";
    return this.http.delete<Sistema>(`${baseUrl5}/${id}`).pipe(
      catchError(e=>{
        Swal.fire(e.error.Mensaje,e.error.error,"error");
        return throwError(e);
      })
    )
  }
}
