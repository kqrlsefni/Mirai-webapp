import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Area } from "../models/area.interface";


@Injectable({
    providedIn: 'root'
  })
export class AreaService{
    private apiUrl: string = environment.apiUrl+"/area";
    constructor(private http: HttpClient) { }
  
    getAreas():Observable<Area[]>{
      return this.http.get<Area[]>(`${this.apiUrl}/findAll`);
  }
  getArea(id: number):Observable<Area>{
    return this.http.get<Area>(`${this.apiUrl}/findById/${id}`);
  }
}