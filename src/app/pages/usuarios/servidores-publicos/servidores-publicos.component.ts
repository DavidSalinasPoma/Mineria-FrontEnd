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
import { MatPaginator } from '@angular/material/paginator';

// Modelos
import { ServidorInterface } from 'src/app/models/servidor.model';


// Utilizando jquery
declare var JQuery: any;
declare var $: any;


// Interface tipo de usuario
interface TipoUsuario {
  value: string;
  viewValue: string;
}

interface EstadoServidor {
  value: string;
  estado: string;
}

// Prueba
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
// FIN PRUEBA


@Component({
  selector: 'app-servidores-publicos',
  templateUrl: './servidores-publicos.component.html',
  styleUrls: ['./servidores-publicos.component.css']
})
export class ServidoresPublicosComponent implements OnInit, AfterViewInit {

  // Material
  public displayedColumns: string[] = ['id', 'nombres', 'paterno', 'materno', 'carnet', 'telefono', 'email', 'direccion', 'estado', 'acciones'];
  public dataSource: MatTableDataSource<ServidorInterface> = new MatTableDataSource<ServidorInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Información de usuario de sistema
  public usuario: any;
  public token: any;
  public rol: any;

  public tipoUsuario: TipoUsuario[] = [
    { value: 'funcionario', viewValue: 'Funcionario publico' },
    { value: 'minero', viewValue: 'Minero' },
    { value: 'agente', viewValue: 'Agente de retención' },
  ];

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

  // loading para atributo [hidden]
  // [hidden]= true  -> oculta el contenido
  public cargando: boolean = false;

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
    this.cargando = false;
    this.sevidorServices.storeServidoresPublicos(this.formulario.value)
      .subscribe(({ status, message }) => {

        if (status === 'success') {
          $('#myModal_crear_servidor').modal('hide');
          this.indexServidores(); //aqui esta this.cargando = true;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${message}`,
            text: 'Sistema de control y fiscalización de regalia minera',
            showConfirmButton: false,
            timer: 2000
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
        this.cargando = true;
        this.btnSave = true;

      }, () => {
        this.btnSave = true;
        this.cargando = true;
      });
  }

  /**
   * indexServidores
   */
  public indexServidores() {
    this.cargando = false;
    this.sevidorServices.indexServidoresPublicos()
      .subscribe(({ servidor }) => {
        this.cargando = true;
        this.dataSource.data = servidor;
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

    this.cargando = false;
    this.btnSave = false;
    this.sevidorServices.updateServidores(formData, this.idServidor)
      .subscribe(({ message }) => {

        $('#myModal_editar_servidor').modal('hide');
        this.indexServidores();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Modificación Correcta!',
          text: `${message}`,
          showConfirmButton: false,
          timer: 2000
        })

      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.message, 'error')
        this.cargando = true;
        this.btnSave = true;
      }, () => {
        this.cargando = true;
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // FIN Data Table Material

  /**
  * destroyPersona
  */
  public destroyServidorPublico(id: number, nombres: string, paterno: string, estado: string) {

    if (estado === 'no habilitado') {
      this.toastr.error('Este servidor ya ha sido deshabilitado', 'Control de relagias mineras')
    } else {
      Swal.fire({
        title: 'Se deshabilitara a:',
        text: `${nombres + ' ' + paterno}`,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar!',
        confirmButtonText: 'Si, deshabilitar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sevidorServices.destroyServidorPublico(id)
            .subscribe(({ status, message }) => {
              if (status === 'success') {
                this.indexServidores();
                Swal.fire(
                  `${nombres + ' ' + paterno}`,
                  `A sido deshabilitado correctamente`,
                  'success'
                );
              }
            }, (err) => {
              this.cargando = true;
              Swal.fire('Error', err.error.message, 'error')
            });
        }
      })
    }
  }
}
