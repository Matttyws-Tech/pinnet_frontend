import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MikrotikService } from '../../../servicios/mikrotik.service';
import { PinService } from '../../../servicios/pin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-generar-pin',
  standalone: true,
  imports: [NgFor],
  templateUrl: './generar-pin.component.html',
  styleUrl: './generar-pin.component.scss'
})
export class GenerarPinComponent {
  perfiles:any[] = []

  datosPin = {
    id:'',
    nombre:'',
    perfil:'',
    tiempoLimite:'',
    precio:'',
    vendedor:sessionStorage.getItem('documento'),
    estado:1,
  }

  constructor(private mikrotik:MikrotikService, private pin:PinService){}

  ngOnInit():void{
    this.consultarPerfiles()
  }

  consultarPerfiles(){
    this.mikrotik.perfiles().subscribe((data:any)=>{
      this.perfiles = data;      
    })
  }



  crearPin(perfil:string, tiempoLimite:string, precio:string){
    this.datosPin.nombre = this.randomPin();
    this.datosPin.perfil = perfil;
    this.datosPin.tiempoLimite = tiempoLimite;
    this.datosPin.precio = precio;

    this.mikrotik.crearPin(this.datosPin.nombre, this.datosPin.perfil, this.datosPin.tiempoLimite).subscribe((data:any)=>{            
      this.datosPin.id = data;

      this.pin.insertar(this.datosPin).subscribe((data2:any)=>{
        if (data2["resultado"] == "ok") {

          Swal.fire({
            title: `${this.datosPin.nombre.toUpperCase()}`,
            text: `Nuevo pin de ${this.datosPin.perfil} generado`,
            icon: "success"          
          });
          
        }   
        
      });     
    });
  }


  randomPin(){
    const characters = 'ab0cde1fgh2ijk3lmn4op5qrs6tuv7wx8yz9';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }
}

