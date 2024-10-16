import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MikrotikService {

  private url = 'http://192.168.0.100/proyecto_pinnet/Backend/controladores/mikrotik.php'

  constructor(private http: HttpClient) { }

  usuarios(){
    return this.http.get(`${this.url}?control=usuarios`)
  }
  usuariosActivos(){
    return this.http.get(`${this.url}?control=usuariosactivos`)
  }
  crearPin(nombre:any, perfil:any, tiempoLimite:any){
    return this.http.get(`${this.url}?control=crearpin&nombre=${nombre}&perfil=${perfil}&tiempolimite=${tiempoLimite}`)
  }
  perfiles(){
    return this.http.get(`${this.url}?control=perfiles`)
  }
  eliminarPinActivo(id:any){
    return this.http.get(`${this.url}?control=eliminarpinactivo&id=${id}`)
  }
  eliminarPin(id:any){
    return this.http.get(`${this.url}?control=eliminarpin&id=${id}`)
  }
}
