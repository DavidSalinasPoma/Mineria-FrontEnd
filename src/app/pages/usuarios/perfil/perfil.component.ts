import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

// Alertas
import Swal from 'sweetalert2';


// Utilizando jquery
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Output() confirmado = new EventEmitter<boolean>(); // Emite un evento para indicar que se ha confirmado la acción

  // Información de usuario de sistema
  public usuario: any;
  public token: any;
  public rol: any;

  // Formularios reactivos
  public formulario!: FormGroup;

  // Para deshabilitar el boton de guardar
  public btnSave: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioServices: UsuarioService,
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
      actualUsuario: ['', Validators.compose([Validators.required])],
      actualPassword: ['', Validators.compose([Validators.required])],
      nuevoPassword: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{6,}$/)])]
    });
  }

  get actualUsuario() {
    return this.formulario.get('actualUsuario');
  }

  get actualPassword() {
    return this.formulario.get('actualPassword');
  }

  get nuevoPassword() {
    return this.formulario.get('nuevoPassword');
  }

  /**
   * submit
   */
  public submit() {

    let usuarioLogueado: any;
    const infoToken = localStorage.getItem('token');
    if (infoToken) {
      const { identity } = JSON.parse(infoToken);
      usuarioLogueado = identity;
    }

    const formData = {
      usuario: this.formulario.value.actualUsuario,
      password: this.formulario.value.actualPassword,
      idUsuario: usuarioLogueado.sub
    }

    this.btnSave = false;
    this.usuarioServices.loginChangesPassword(formData)
      .subscribe(({ status }) => {
        if (status === 'success') {

          Swal.fire({
            title: 'Esta seguro de cambiar su contraseña?',
            text: `Si esta de acuerdo debe iniciar sesión nuevamente`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar!',
            confirmButtonText: 'Si, cambiar'
          }).then((result) => {
            if (result.isConfirmed) {

              const nuevaContraseña = {
                password: this.formulario.value.nuevoPassword,
                idUsuario: usuarioLogueado.sub
              }

              this.usuarioServices.updateChangesPassword(nuevaContraseña)
                .subscribe(resp => {
                  $('#myModal_changes_pass').modal('hide');
                  // localStorage.removeItem('position');
                  // localStorage.removeItem('items');
                  localStorage.removeItem('token');
                  this.router.navigateByUrl('/login');
                  Swal.fire(
                    'La contraseña se cambio correctamente!',
                    'Inicie sesión nuevamente',
                    'success'
                  )
                });
            }
          })
        } else {
          Swal.fire('Error', 'La credencial actual es incorrecta..', 'error')
        }

      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.message, 'error')
        this.btnSave = true;
      }, () => {
        this.btnSave = true;
      });
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
