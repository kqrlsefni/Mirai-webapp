import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Contrato } from '../models/contrato.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl: string = environment.apiUrl+"/contrato";
  constructor(private http: HttpClient) { }

  getContratos():Observable<Contrato[]>{
    return this.http.get<Contrato[]>(`${this.apiUrl}/findAll`);
}
}
