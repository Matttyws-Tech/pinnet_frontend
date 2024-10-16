import { Component} from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { PinService } from '../../../servicios/pin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro-pines',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  templateUrl: './registro-pines.component.html',
  styleUrl: './registro-pines.component.scss'
})
export class RegistroPinesComponent {

  datos:any;

  constructor(private pin:PinService){}

  ngOnInit(): void{
    this.consultar()
  }

  consultar(){
    this.pin.consultar().subscribe((data:any)=>{
      this.datos = data;
    })
  }

}
