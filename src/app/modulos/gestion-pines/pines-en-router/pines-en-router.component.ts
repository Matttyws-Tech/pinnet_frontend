import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MikrotikService } from '../../../servicios/mikrotik.service';
import { PinService } from '../../../servicios/pin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pines-en-router',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pines-en-router.component.html',
  styleUrl: './pines-en-router.component.scss'
})
export class PinesEnRouterComponent {


  pines: any;

  constructor(private mikrotik:MikrotikService, private pin:PinService){}

  ngOnInit():void{
    this.consultarUsuarios()
  }

  consultarUsuarios(){
    this.mikrotik.usuarios().subscribe((data:any)=>{
      this.pines = data;      
    })
  }


  eliminarPin(id:any){
    Swal.fire({
      title: "¿Desea eliminar este pin?",
      text: "Este proceso no puede ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        /********************* */
        
        this.mikrotik.eliminarPin(id).subscribe((data:any)=>{
          this.pin.editarEstado(id, '3').subscribe((data2:any)=>{
            if (data2["resultado"] == "ok") {
              this.consultarUsuarios()       

            }  
    
          })
        });

        /******************* */
        Swal.fire({
          title: "Eliminado!",
          text: "El pin ha sido eliminado del router.",
          icon: "success"
        });
      }
    });
  }
  
}
