import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;
  constructor(private fb: FormBuilder, private validadores:ValidadoresService) {
    //Crea un formgroup para los campos de forma dinamica y sus validaciones
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      usuario:['',Validators.required,this.validadores.existeUsuario],
      pass1:['',Validators.required],
      pass2:['',Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos:this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
    
    this.cargarDataFormulario();
    this.crearListeners();
  }
  crearListeners(){
    /* this.forma.valueChanges.subscribe(valor=>{
      console.log(valor);
    });
    this.forma.statusChanges.subscribe(status=> console.log({status})); */
    this.forma.get('nombre')?.valueChanges.subscribe(console.log);
  }

  cargarDataFormulario() {
    //Para utilizar el setValue es necesario cargar todos los datos de todos los campos en el form  por ejemplo en el array
    /*this.forma.setValue({
      nombre: 'Isaias',
      apellido: 'Trejo',
      correo: 'isnaek@gmail.com',
      direccion: {
        distrito: 'San Martin',
        ciudad: 'Mexico',
      },
    });*/
    //Se utiliza reset para ciertos campos 
      this.forma.reset({
      nombre: 'Isaias',
      apellido: 'Herreras',
      correo: 'isnaek@gmail.com',
      pass1: 'isnaek@gmail.com',
      pass2: 'isnaek@gmail.com',
      direccion: {
        distrito: 'San Martin',
        ciudad: 'Mexico',
      },
    });
  }

  ngOnInit(): void {}
  //Agrega un pasatiempo al array que existe en el constructor
  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control(''));
  }
  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

//validacion del campo pass cuando es invalido y ya ha sido tocado una vez
get pass1NoValido() {
  return (
   this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  );
}

//validacion del campo pass cuando es invalido y ya ha sido tocado una vez
get pass2NoValido() {
  const pass1= this.forma.get('pass1')?.value;
  const pass2= this.forma.get('pass2')?.value;
  return (pass1 === pass2) ? false : true;
  //return (this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched);
}
//usuarioNoValido
//validacion del campo nombre cuando es invalido y ya ha sido tocado una vez
get usuarioNoValido() {
  return (
   this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
  );
}


//retorna los pasatiempos que existe
  get pasatiempos()  {
    return this.forma.get('pasatiempos') as FormArray;
  }
//validacion del campo nombre cuando es invalido y ya ha sido tocado una vez
  get nombreNoValido() {
    return (
     this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
    );
  }
  //validacion del campo nombre cuando es invalido y ya ha sido tocado una vez
  get apellidoNoValido() {
    return (
      this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
      //this.forma.get('apellido')?.errors?.noHerrera && this.forma.get('nombre')?.touched
    );
  }
  //validacion del campo nombre cuando es invalido y ya ha sido tocado una vez
  get correoNoValido() {
    return (
      this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
    );
  }
//validacion del campo nombre cuando es invalido y ya ha sido tocado una vez
  get dDistNoValido() {
    return (
      this.forma.get('direccion.distrito')?.invalid &&
      this.forma.get('direccion.distrito')?.touched
    );
  }
//validacion del campo nombre cuando es invalido y ya ha sido tocado una vez
  get dCiuNoValido() {
    return (
      this.forma.get('direccion.ciudad')?.invalid &&
      this.forma.get('direccion.ciudad')?.touched
    );
  }

  //Valida el formulario de todos los campos y hace touched si no allan sido tocados para validar 
  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        console.log(control);

        control.markAllAsTouched();
      });
    }
//Resetea el formulario
    this.forma.reset();

  }
}
