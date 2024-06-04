import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Jornada } from '../models/jornada.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  private apiUrl: string = environment.apiUrl+"/jornada";
  constructor(private http: HttpClient) { }

  getJornadas():Observable<Jornada[]>{
    return this.http.get<Jornada[]>(`${this.apiUrl}/findAll`);
}
getJornada(id: number):Observable<Jornada>{
  return this.http.get<Jornada>(`${this.apiUrl}/findById/${id}`)
}
}
