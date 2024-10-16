import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MikrotikService } from '../../../servicios/mikrotik.service';

@Component({
  selector: 'app-pines-en-uso',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pines-en-uso.component.html',
  styleUrl: './pines-en-uso.component.scss'
})
export class PinesEnUsoComponent {

  datos: any;

  constructor(private mikrotik:MikrotikService){}

  ngOnInit():void{
    this.consultarUsuariosActivos()
  }

  consultarUsuariosActivos(){
    this.mikrotik.usuariosActivos().subscribe((data:any)=>{
      this.datos = data;      
    })
  }


  eliminar(id:any){
    this.mikrotik.eliminarPinActivo(id).subscribe((data:any)=>{
      this.consultarUsuariosActivos()
    })

  }

}
