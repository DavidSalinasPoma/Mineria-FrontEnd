import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { SpublicosService } from 'src/app/services/spublicos.service';


// Alertas
import Swal from 'sweetalert2';

// Notificaciones
import { ToastrService } from 'ngx-toastr';


// Utilizando jquery
declare var JQuery: any;
declare var $: any;


// Interface tipo de usuario
interface TipoUsuario {
  value: string;
  viewValue: string;
}

export interface ListaServidores {
  codigo: number;
  nombres: string;
  paterno: string;
  materno: string;
  carnet: string;
  telefono: number;
  email: string;
  direccion: string;
  estado: number;
  created_at: string;
  updated_at: string;
}

interface EstadoServidor {
  value: string;
  estado: string;
}


@Component({
  selector: 'app-servidores-publicos',
  templateUrl: './servidores-publicos.component.html',
  styleUrls: ['./servidores-publicos.component.css']
})
export class ServidoresPublicosComponent implements OnInit {

  // Material
  public displayedColumns: string[] = ['codigo', 'nombres', 'carnet', 'telefono', 'email', 'direccion', 'estado', 'acciones'];
  public dataSource: any = new MatTableDataSource([]); // Declaración


  // Información de usuario de sistema
  public usuario: any;
  public token: any;
  public rol: any;

  public tipoUsuario: TipoUsuario[] = [
    { value: 'funcionario', viewValue: 'Funcionario publico' },
    { value: 'minero', viewValue: 'Minero' },
    { value: 'agente', viewValue: 'Agente de retención' },
  ];

  @ViewChild(MatSort) sort!: MatSort;


  public favoriteSeason!: string;
  public seasons: string[] = ['Operador', 'Seguimiento', 'Administrador', 'Secretaria'];

  // Formularios reactivos
  public formulario!: FormGroup;
  public formularioModificar!: FormGroup;
  public formularioSearch!: FormGroup;

  // Para deshabilitar el boton de guardar
  public btnSave: boolean = true;

  public estados: EstadoServidor[] = [
    { value: 'habilitado', estado: 'Habilitado' },
    { value: 'no habilitado', estado: 'No habilitado' }
  ];

  public idServidor!: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sevidorServices: SpublicosService,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.crearFormularioModificar();
    this.indexServidores();

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
      nombres: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      paterno: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      materno: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      carnet: ['', Validators.compose([Validators.required, Validators.maxLength(12)])],
      telefono: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      direccion: ['', Validators.compose([Validators.required])]
    });
  }
  get nombres() {
    return this.formulario.get('nombres');
  }

  get paterno() {
    return this.formulario.get('paterno');
  }

  get materno() {
    return this.formulario.get('materno');
  }

  get carnet() {
    return this.formulario.get('carnet');
  }

  get telefono() {
    return this.formulario.get('telefono');
  }

  get email() {
    return this.formulario.get('email');
  }

  get direccion() {
    return this.formulario.get('direccion');
  }

  /**
  * crearFormularioModificar
  */
  public crearFormularioModificar() {
    this.formularioModificar = this.fb.group({
      nombresM: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      paternoM: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      maternoM: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      carnetM: ['', Validators.compose([Validators.required, Validators.maxLength(12)])],
      telefonoM: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)])],
      emailM: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      direccionM: ['', Validators.compose([Validators.required])],
      estadoM: ['', Validators.compose([Validators.required])]
    });
  }
  get nombresM() {
    return this.formulario.get('nombresM');
  }

  get paternoM() {
    return this.formulario.get('paternoM');
  }

  get maternoM() {
    return this.formulario.get('maternoM');
  }

  get carnetM() {
    return this.formulario.get('carnetM');
  }

  get telefonoM() {
    return this.formulario.get('telefonoM');
  }

  get emailM() {
    return this.formulario.get('emailM');
  }

  get direccionM() {
    return this.formulario.get('direccionM');
  }

  get estadoM() {
    return this.formulario.get('estadoM');
  }


  /**
   * Registrar nuevo usuario
   */
  public submit() {
    this.btnSave = false;
    this.sevidorServices.storeServidoresPublicos(this.formulario.value)
      .subscribe(({ status, message }) => {

        if (status === 'success') {
          $('#myModal_agregar').modal('hide');
          // this.indexUsuarios();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${message}`,
            text: 'Sistema de control y fiscalización de regalia minera',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          this.toastr.error(message, 'Sistema de control y fiscalización de regalia minera');
        }
      }, (err) => {
        console.log(err);
        if (err.error.errors.carnet) {
          Swal.fire('Error', err.error.errors.carnet[0], 'error')
        } else {
          Swal.fire('Error', err.error.message, 'error')
        }
        this.btnSave = true;
      }, () => {
        this.btnSave = true;
      });
  }

  /**
   * indexServidores
   */
  public indexServidores() {
    this.sevidorServices.indexServidoresPublicos()
      .subscribe(({ servidor }) => {
        this.dataSource = new MatTableDataSource(servidor);
      })
  }


  /**
  * Cargar datos para modificar servidores
  */
  public modificarServidoresPublicos(id: number) {

    this.idServidor = id;

    this.sevidorServices.showServidoresPublicos(id)
      .subscribe(({ servidor }) => {

        this.formularioModificar.setValue({
          nombresM: servidor.nombres,
          paternoM: servidor.paterno,
          maternoM: servidor.materno,
          carnetM: servidor.carnet,
          telefonoM: servidor.telefono,
          emailM: servidor.email,
          direccionM: servidor.direccion,
          estadoM: servidor.estado,
        });

      }, (err) => {
        Swal.fire('Error', err.error.message, 'error')
      });

    $('#myModal_editar_servidor').modal('show');
  }

  /**
  * submitModificar
  */
  public submitModificar() {

    const formData = {
      nombres: this.formularioModificar.value.nombresM,
      paterno: this.formularioModificar.value.paternoM,
      materno: this.formularioModificar.value.maternoM,
      carnet: this.formularioModificar.value.carnetM,
      telefono: this.formularioModificar.value.telefonoM,
      email: this.formularioModificar.value.emailM,
      direccion: this.formularioModificar.value.direccionM,
      estado: this.formularioModificar.value.estadoM,
    }

    console.log(formData);


    this.btnSave = false;
    this.sevidorServices.updateServidores(formData, this.idServidor)
      .subscribe(({ message }) => {

        // Para mostrar la Busqueda
        // if (this.mostrarReunionHtml) {
        //   this.indexPaginacion();
        // } else {
        //   this.indexPaginacionBuscar();
        // }

        $('#myModal_editar_servidor').modal('hide');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `${message}`,
          showConfirmButton: false,
          timer: 3000
        })
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


  // Data Table Material
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    console.log(sortState);

    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
