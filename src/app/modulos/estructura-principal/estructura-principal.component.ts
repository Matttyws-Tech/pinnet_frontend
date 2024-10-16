import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-estructura-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NgClass],
  templateUrl: './estructura-principal.component.html',
  styleUrl: './estructura-principal.component.scss'
})
export class EstructuraPrincipalComponent {

  nombre:any;
  apellido: any;
  rol: any;

  isMenuOpen=false;

  constructor(private router:Router){}

  ngOnInit(){
    this.nombre = sessionStorage.getItem('nombre');
    this.apellido = sessionStorage.getItem('apellido');
    this.rol = sessionStorage.getItem('rol');
  }

  salir(){
    this.router.navigate(["login"])
    sessionStorage.clear()
  }
  
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

}
