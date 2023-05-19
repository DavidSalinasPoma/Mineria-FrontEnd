import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Alertas
import Swal from 'sweetalert2';


// Utilizando jquery
declare var JQuery: any;
declare var $: any;


// Interface tipo de usuario
interface TipoUsuario {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Información de usuario de sistema
  public usuario: any;
  public token: any;
  public rol: any;

  public tipoUsuario: TipoUsuario[] = [
    { value: 'funcionario', viewValue: 'Funcionario publico' },
    { value: 'minero', viewValue: 'Minero' },
    { value: 'agente', viewValue: 'Agente de retención' },
  ];

  public favoriteSeason!: string;
  public seasons: string[] = ['Operador', 'Seguimiento', 'Administrador', 'Secretaria'];

  // Formularios reactivos
  public formulario!: FormGroup;

  // Para deshabilitar el boton de guardar
  public btnSave: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();

    const user = localStorage.getItem('token');
    if (user) {
      const { token, identity } = JSON.parse(user);
      this.usuario = identity;
      this.token = token;
      this.rol = identity.rol;
    }

  }

  /**
* crearFormulario
*/
  public crearFormulario() {
    this.formulario = this.fb.group({
      selectUsuario: ['', Validators.compose([Validators.required])],
      nombreUsuario: ['', Validators.compose([Validators.required])],
      nuevoUsuario: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      rolUsuario: ['', Validators.compose([Validators.required])]
    });
  }
  get selectUsuario() {
    return this.formulario.get('selectUsuario');
  }

  get nombreUsuario() {
    return this.formulario.get('nombreUsuario');
  }

  get nuevoUsuario() {
    return this.formulario.get('nuevoUsuario');
  }

  get password() {
    return this.formulario.get('password');
  }

  get rolUsuario() {
    return this.formulario.get('password');
  }



  /**
   * Registrar nuevo usuario
   */
  public submit() {

  }


  /**
* borrarFormulario
*/
  public borrarFormulario(formDirective: FormGroupDirective) {
    this.formulario.reset();
    if (this.formulario.valid || !this.formulario.valid) {
      formDirective.resetForm();
      this.formulario.reset();
    }
  }


}
