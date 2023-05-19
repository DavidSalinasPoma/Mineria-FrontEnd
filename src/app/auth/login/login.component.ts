import { Component, OnInit } from '@angular/core';

// Para utilizar formularios reactivos
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Motras ntificaciones en tarjetas
import Swal from 'sweetalert2';


// Para navegar de una pagina a otra
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

// Notificaciones
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public cargando = false;

  // Formularios
  public formulario!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioServices: UsuarioService,
    private toastr: ToastrService
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void { }

  /**
   * crearFormulario
   */
  public crearFormulario() {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  /**
   * login de Usuarios
   */
  public login() {

    // Spinner de ingresando al sistema
    this.cargando = true;
    // console.log(this.formulario.value);

    this.usuarioServices.login(this.formulario.value)
      .subscribe(resp => {
        this.cargando = false;
        if (resp.status === 'success') {
          this.cargando = false;

          this.router.navigateByUrl('/dashboard');

          // remember
          if (this.formulario.get('remember')?.value) {
            localStorage.setItem('usuario', this.formulario.get('usuario')?.value)
          } else {
            localStorage.removeItem('usuario');
          }


          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bienvenid@',
            text: `${resp.identity.nombres} ${resp.identity.apellidos}`,
            showConfirmButton: false,
            timer: 1500
          })
          // this.toastr.success(`${resp.identity.nombres} ${resp.identity.apellidos}`, 'Bienvenid@', {
          //   positionClass: "toast-top-center",
          //   easeTime: 300,
          //   timeOut: 2000,
          // });

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales Incorrectas..!',
            text: 'Vuelva a intentarlo!',
            footer: 'Gobierno Autónomo Departamental de Cochabamba'
          })
          this.cargando = false;
        }

      }, (err) => {
        console.log(err);

        Swal.fire('Error', err.error.message, 'error')
        this.cargando = false;
      });
  }

  // Validaciones para formulario
  get usuario() {
    return this.formulario.get('usuario');
  }
  get password() {
    return this.formulario.get('password');
  }
  get remember() {
    return this.formulario.get('remember');
  }

}
