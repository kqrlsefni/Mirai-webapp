import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado.interface';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { EmpleadoDetail } from '../models/empleado-detail.interface';
import { EmpleadoReq } from '../models/empledo-req';
import { tap } from 'rxjs/operators';
import { EmpleadoDelRes } from '../models/empleado-del-res';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl: string = environment.apiUrl+"/empleado";
  private _refresh$ = new Subject<void>()
  //apiUrl = '/api/empleado'
  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$
  }

  getEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.apiUrl}/findAll`);
}
  getEmpleado(id: number):Observable<Empleado>{
    return this.http.get<Empleado>(`${this.apiUrl}/findById/${id}`)
  }
  createEmpleado(empleado: EmpleadoReq):Observable<EmpleadoReq>{
    return this.http.post<EmpleadoReq>(`${this.apiUrl}/create`,empleado)
      .pipe(
        tap(() => {
          this._refresh$.next()
        })
      )
  }

  deleteEmpleado(id: number):Observable<EmpleadoDelRes>{
    return this.http.delete<EmpleadoDelRes>(`${this.apiUrl}/delete/${id}`)
      .pipe(
        tap(() => {
          this._refresh$.next()
        })
      )
  }

  updateEmpleado(empleado: EmpleadoReq):Observable<EmpleadoReq>{
    return this.http.put<EmpleadoReq>(`${this.apiUrl}/update`,empleado)
      .pipe(
        tap(() => {
          this._refresh$.next()
        })
      )
  }
}
