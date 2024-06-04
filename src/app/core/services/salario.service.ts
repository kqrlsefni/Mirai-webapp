import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Salario } from '../models/salario.interface';
import { Observable, Subject, tap } from 'rxjs';
import { SalarioNetoRe } from '../models/salario-neto-req';
import { SalarioNeto } from '../models/salario-neto.interface';

@Injectable({
  providedIn: 'root'
})
export class SalarioService {
  private apiUrl: string = environment.apiUrl+"/salario";
  private _refresh$ = new Subject<void>()
  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$
  }

  updateSalario(salario: Salario):Observable<Salario>{
    return this.http.put<Salario>(`${this.apiUrl}/update`,salario)
      .pipe(
        tap(() => {
          this._refresh$.next()
        })
      );
}
  getSalarioNeto(id: number):Observable<SalarioNeto>{
    return this.http.get<SalarioNeto>(`${this.apiUrl}/getSalarioNeto/${id}`)
      .pipe(
        tap(() => {
          this._refresh$.next()
        })
      );
}
  getPagoExcel():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/pagoExcel`, {responseType: 'blob' as 'json'});
}
}
