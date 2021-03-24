import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [
  ]
})
export class TemplateComponent implements OnInit {
usuario={
  nombre:'Isais',
  apellido:'Trejo',
  correo:'isnaeky.treiny@gmail.com',
  pais:'MEX',
  genero:'femenino'
}
paises:any[]=[];
  constructor(private ser:PaisService) { }

  ngOnInit(): void {
    this.ser.getPaises().subscribe(data=>{
      this.paises=data;
      this.paises.unshift({
        nombre:'Seleccione',
        codigo:''
      })
    });
  }
  guardar(form:NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach(control=>{
        control.markAllAsTouched();
      })
      return;
    }

    console.log('submit disparado');
    console.log(form.value);
    
  }
}
