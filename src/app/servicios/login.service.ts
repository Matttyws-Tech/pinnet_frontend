import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://192.168.0.100/proyecto_pinnet/Backend/controladores/login.php';

  constructor(private http:HttpClient) { }

  consultar(email:any, clave:any){
    return this.http.get(`${this.url}?email=${email}&clave=${clave}`);
  }


}
