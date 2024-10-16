import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../../servicios/usuario.service';
import { FormsModule } from '@angular/forms';
import { RolService } from '../../../servicios/rol.service';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [FormsModule, NgFor, ],
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.scss'
})
export class RegistrarUsuarioComponent implements AfterViewInit {

  datosUsuario: any;
  datosRol: any;

  form = {
    documento: "",
    nombre: "",
    apellido:"",
    celular:"",
    email:"",
    clave:"",
    rol:1
  }  

  @ViewChild('primerInput') inputRef!: ElementRef;

  constructor(private usuario:UsuarioService, private rol:RolService){}

  ngOnInit(): void{
    this.consultarRol()
  }
  
  ngAfterViewInit() {
    this.inputRef.nativeElement.focus()
  }

  insertar(){
  }
  
  consultarRol(){
    this.rol.consultar().subscribe((data:any)=>{
      this.datosRol = data      
    });
  }

  convertToInt(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.form.rol = parseInt(target.value, 10);
  }
  
  onSubmit(myForm:any) {        
    this.usuario.insertar(this.form).subscribe((data:any)=>{    
      if (data["resultado"] == "ok") {
        Swal.fire({
          title: "Usuario registrado!",
          text: "El usuario ha sido ingresado correctamente",
          icon: "success",
          timer: 2000
        });
      }      
    })

    myForm.resetForm();
  }

}
