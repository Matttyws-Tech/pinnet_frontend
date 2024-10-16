import { Component } from '@angular/core';
import { UsuarioService } from '../../../servicios/usuario.service';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from '@angular/forms';
import { RolService } from '../../../servicios/rol.service';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent {

  datos: any;

  datosRol: any;

  editForm = {
    documento: "",
    nombre: "",
    apellido:"",
    celular:"",
    email:"",
    clave:"",
    rol:0
  }

  constructor(private usuario:UsuarioService, private rol:RolService){}

  ngOnInit(): void{
    this.consultar()
    this.consultarRol()
  }

  consultar(){
    this.usuario.consultar().subscribe((data:any)=>{
      this.datos = data
    })
  }

  eliminar(id:any){

    Swal.fire({
      title: "¿Esta seguro de eliminar a este usuario?",
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
        this.usuario.eliminar(id).subscribe((data:any)=>{
          if (data["resultado"] == "ok") {
            this.consultar()            
          }  
        })
        /******************* */
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminado del sistema.",
          icon: "success"
        });
      }
    });
  }

  consultarRol(){
    this.rol.consultar().subscribe((data:any)=>{
      this.datosRol = data
    })
  }

  cargarDatos(datos:any){
    this.editForm.documento = datos.documento;
    this.editForm.nombre = datos.nombre;
    this.editForm.apellido = datos.apellido;
    this.editForm.celular = datos.celular;
    this.editForm.email = datos.email;
    this.editForm.clave = datos.clave;
    this.editForm.rol = parseInt(datos.id_rol);    
  }

  onSubmit(myForm:any){
    this.usuario.editar(this.editForm.documento, this.editForm).subscribe((data:any)=>{
      if (data["resultado"] == "ok") {
        Swal.fire({
          title: "Usuario editado!",
          text: "la informacion del usuario ha sido cambiada correctamente",
          icon: "success",
          timer: 2000
        });                
        this.consultar()
      }
    })
  }

}
