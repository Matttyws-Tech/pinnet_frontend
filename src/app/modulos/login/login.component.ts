import { Component } from '@angular/core';
import { FormsModule, ValueChangeEvent } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email:any;
  clave:any;
  validar=true;
  usuario:any

  constructor(private login:LoginService, private router:Router){}
  
  ngOnInit(): void{
  }

  onSubmit(myForm:any){
    this.login.consultar(this.email, this.clave).subscribe((data:any)=>{       
      if(data[0].validar){
        sessionStorage.setItem('documento', data[0].documento);
        sessionStorage.setItem('nombre', data[0].nombre);
        sessionStorage.setItem('apellido', data[0].apellido);
        sessionStorage.setItem('email', data[0].email);
        sessionStorage.setItem('rol', data[0].rol);
        this.router.navigate([''])
      }else{
        this.validar = data.validar
      }
    })
  }
}
