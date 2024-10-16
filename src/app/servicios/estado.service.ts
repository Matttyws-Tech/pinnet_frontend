import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  url = 'http://192.168.0.100/proyecto_pinnet/Backend/controladores/estado.php';

  constructor(private http:HttpClient) { }

  consultar(){
    return this.http.get(`${this.url}?control=consultar`);
  }

  eliminar(id:number){
    return this.http.get(`${this.url}?control=eliminar&id=${id}`);
  }

  insertar(valores:any){
    return this.http.post(`${this.url}?control=insertar`, JSON.stringify(valores));
  }

  editar(id:number, valores:any){
    return this.http.post(`${this.url}?control=editar&id=${id}`, JSON.stringify(valores));
  }

  filtro(dato:any){
    return this.http.get(`${this.url}?control=filtro&dato=${dato}`);
  }
}
