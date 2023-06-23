import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

// Servicios
import { SpublicosService } from 'src/app/services/spublicos.service';
import { RuimService } from 'src/app/services/ruim.service';

// Alertas
import Swal from 'sweetalert2';

// Notificaciones
import { ToastrService } from 'ngx-toastr';

// Modelos
import { ServidorInterface } from 'src/app/models/servidor.model';
import { RuimInterface } from 'src/app/models/ruim.model';

// RXJS
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';


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
  selector: 'app-ruim',
  templateUrl: './ruim.component.html',
  styleUrls: ['./ruim.component.css']
})
export class RuimComponent implements OnInit {

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

  public idRuims!: number;

  // loading para atributo [hidden]
  // [hidden]= true  -> oculta el contenido
  public cargando: boolean = true;

  // Mejorar el performance de la busqueda
  private OnDestroy$ = new Subject();
  public searchTerm$ = new Subject<string>();



  public dataServidores!: ServidorInterface[];
  public dataRuims!: RuimInterface[];

  // Paginación
  public current_page: any;
  public first_page_url: any;
  public from: any;
  public last_page: any;
  public last_page_url: any;
  public next_page_url: any;
  public path: any
  public per_page: any;
  public prev_page_url: any;
  public to: any
  public total: number = 0;
  public p: number = 1;
  // Fin Paginación


  // Limpiar input buscador
  public searchTerm: string = '';


  constructor(

    private fb: FormBuilder,
    private toastr: ToastrService,
    private sevidorServices: SpublicosService,
    private ruimsServices: RuimService

  ) { }

  ngOnInit(): void {

    this.eliminarLocalStorage();

    this.crearFormulario();
    this.crearFormularioModificar();
    this.indexRuims();
    // Buscador de servidores publicos
    this.submitSearch();

    // Borrar texto buscar

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
      nro_id_mineria: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      sector: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      actividad: ['', Validators.compose([Validators.required, Validators.maxLength(70)])],
      rep_legal: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      municipio: ['', Validators.compose([Validators.required])],
      fecha_registro: ['', Validators.compose([Validators.required])],
      fecha_expiracion: ['', Validators.compose([Validators.required])]
    });
  }
  get nro_id_mineria() {
    return this.formulario.get('nro_id_mineria');
  }

  get sector() {
    return this.formulario.get('sector');
  }

  get actividad() {
    return this.formulario.get('actividad');
  }

  get rep_legal() {
    return this.formulario.get('rep_legal');
  }

  get municipio() {
    return this.formulario.get('municipio');
  }

  get fecha_registro() {
    return this.formulario.get('fecha_registro');
  }

  get fecha_expiracion() {
    return this.formulario.get('fecha_expiracion');
  }

  /**
  * crearFormularioModificar
  */
  public crearFormularioModificar() {
    this.formularioModificar = this.fb.group({
      nro_id_mineriaM: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      sectorM: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      actividadM: ['', Validators.compose([Validators.required, Validators.maxLength(70)])],
      rep_legalM: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(50)])],
      municipioM: ['', Validators.compose([Validators.required])],
      fecha_registroM: ['', Validators.compose([Validators.required])],
      fecha_expiracionM: ['', Validators.compose([Validators.required])],
      estadoM: ['', Validators.compose([Validators.required])]
    });
  }

  get nro_id_mineriaM() {
    return this.formulario.get('nro_id_mineriaM');
  }

  get sectorM() {
    return this.formulario.get('sectorM');
  }

  get actividadM() {
    return this.formulario.get('actividadM');
  }

  get rep_legalM() {
    return this.formulario.get('rep_legalM');
  }

  get municipioM() {
    return this.formulario.get('municipioM');
  }

  get fecha_registroM() {
    return this.formulario.get('fecha_registroM');
  }

  get fecha_expiracionM() {
    return this.formulario.get('fecha_expiracionM');
  }

  get estadoM() {
    return this.formulario.get('estadoM');
  }

  /**
   * Registrar nuevo usuario
   */
  public submit() {
    this.btnSave = false;
    this.cargando = true;
    this.ruimsServices.storeRuims(this.formulario.value)
      .subscribe({
        next: ({ status, message }) => {

          if (status === 'success') {

            this.eliminarLocalStorage();

            $('#myModal_crear_ruim').modal('hide');
            this.indexRuims(); //aqui esta this.cargando = true;
            // Limpiar el campo de búsqueda
            this.searchTerm = '';
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
        },
        error: (err: any) => {
          console.log(err);
          this.cargando = false;
          this.btnSave = true;
          if (err.error.errors.nro_id_mineria) {
            Swal.fire('Error', err.error.errors.nro_id_mineria[0], 'error')
          } else {
            Swal.fire('Error', err.error.message, 'error')
          }

        },
        complete: () => {
          this.btnSave = true;
          this.cargando = false;
        }
      });

  }

  /**
   * indexRuims
   */
  public indexRuims() {

    this.dataRuims = [];
    this.cargando = true;

    // Condicion si es para el textoBuscar
    const textoBuscar = localStorage.getItem('textoBuscar');

    if (textoBuscar != null) {

      const posicion = localStorage.getItem('position');

      const formData: { ruim: string, page: number } = {
        ruim: textoBuscar,
        page: Number(posicion)
      }

      this.cargando = true;
      this.ruimsServices.searchRuims(formData)
        .subscribe(({ ruims }) => {

          const {
            data,
            current_page,
            first_page_url,
            from,
            last_page,
            last_page_url,
            next_page_url,
            path,
            per_page,
            prev_page_url,
            to,
            total
          } = ruims;

          this.dataRuims = data;
          console.log(this.dataRuims);


          this.current_page = current_page;
          this.first_page_url = first_page_url;
          this.from = from;
          this.last_page = last_page;
          this.last_page_url = last_page_url;
          this.next_page_url = next_page_url;
          this.path = path;
          this.per_page = per_page;
          this.prev_page_url = prev_page_url;
          this.to = to;
          this.total = total;

          this.p = this.current_page;

          this.cargando = false;

          // Para paginación
          localStorage.setItem('position', `${this.p}`);
          localStorage.setItem('items', `${this.total}`);
        })

    } else {
      let pagina = 1;
      const position = localStorage.getItem('position');
      if (position != null) {
        pagina = Number(position);
      }

      this.ruimsServices.indexRuims(pagina)
        .subscribe(({ ruims }) => {

          const {
            data,
            current_page,
            first_page_url,
            from,
            last_page,
            last_page_url,
            next_page_url,
            path,
            per_page,
            prev_page_url,
            to,
            total
          } = ruims;

          this.cargando = false;
          this.dataRuims = data;

          this.current_page = current_page;
          this.first_page_url = first_page_url;
          this.from = from;
          this.last_page = last_page;
          this.last_page_url = last_page_url;
          this.next_page_url = next_page_url;
          this.path = path;
          this.per_page = per_page;
          this.prev_page_url = prev_page_url;
          this.to = to;
          this.total = total;

          this.p = current_page;

          // Para paginación
          localStorage.setItem('position', `${this.p}`);
          localStorage.setItem('items', `${this.total}`);

        })
    }


  }

  /**
  * indexServidores ELIMINAR
  */
  public indexServidores() {

    this.dataServidores = [];
    this.cargando = true;

    // Condicion si es para el textoBuscar
    const textoBuscar = localStorage.getItem('textoBuscar');

    if (textoBuscar != null) {

      const posicion = localStorage.getItem('position');

      const formData: { servidor: string, page: number } = {
        servidor: textoBuscar,
        page: Number(posicion)
      }

      this.cargando = true;
      this.sevidorServices.searchServidoresPublicos(formData)
        .subscribe(({ servidores }) => {

          const {
            data,
            current_page,
            first_page_url,
            from,
            last_page,
            last_page_url,
            next_page_url,
            path,
            per_page,
            prev_page_url,
            to,
            total
          } = servidores;

          this.dataServidores = data;
          console.log(this.dataServidores);


          this.current_page = current_page;
          this.first_page_url = first_page_url;
          this.from = from;
          this.last_page = last_page;
          this.last_page_url = last_page_url;
          this.next_page_url = next_page_url;
          this.path = path;
          this.per_page = per_page;
          this.prev_page_url = prev_page_url;
          this.to = to;
          this.total = total;

          this.p = this.current_page;

          this.cargando = false;

          // Para paginación
          localStorage.setItem('position', `${this.p}`);
          localStorage.setItem('items', `${this.total}`);
        })

    } else {
      let pagina = 1;
      const position = localStorage.getItem('position');
      if (position != null) {
        pagina = Number(position);
      }

      this.sevidorServices.indexServidoresPublicos(pagina)
        .subscribe(({ servidores }) => {

          const {
            data,
            current_page,
            first_page_url,
            from,
            last_page,
            last_page_url,
            next_page_url,
            path,
            per_page,
            prev_page_url,
            to,
            total
          } = servidores;

          this.cargando = false;
          this.dataServidores = data;

          this.current_page = current_page;
          this.first_page_url = first_page_url;
          this.from = from;
          this.last_page = last_page;
          this.last_page_url = last_page_url;
          this.next_page_url = next_page_url;
          this.path = path;
          this.per_page = per_page;
          this.prev_page_url = prev_page_url;
          this.to = to;
          this.total = total;

          this.p = current_page;

          // Para paginación
          localStorage.setItem('position', `${this.p}`);
          localStorage.setItem('items', `${this.total}`);

        })
    }


  }


  /**
  * Cargar datos para modificar servidores
  */
  public modificarRuims(id: number) {

    this.idRuims = id;

    this.ruimsServices.showRuims(id)
      .subscribe({
        next: ({ ruims }) => {

          let ruimsData: RuimInterface = ruims;

          this.formularioModificar.setValue({
            nro_id_mineriaM: ruimsData.nro_id_mineria,
            sectorM: ruimsData.sector,
            actividadM: ruimsData.actividad,
            rep_legalM: ruimsData.rep_legal,
            municipioM: ruimsData.municipio,
            fecha_registroM: ruimsData.fecha_registro,
            fecha_expiracionM: ruimsData.fecha_expiracion,
            estadoM: ruimsData.estado,
          });

        },
        error: (err: any) => {
          Swal.fire('Error', err.error.message, 'error')
        },
        complete: () => {

        }
      });
    $('#myModal_editar_ruims').modal('show');
  }

  /**
  * submitModificar
  */
  public submitModificar() {

    const formData: RuimInterface = {
      nro_id_mineria: this.formularioModificar.value.nro_id_mineriaM,
      sector: this.formularioModificar.value.sectorM,
      actividad: this.formularioModificar.value.actividadM,
      rep_legal: this.formularioModificar.value.rep_legalM,
      municipio: this.formularioModificar.value.municipioM,
      fecha_registro: this.formularioModificar.value.fecha_registroM,
      fecha_expiracion: this.formularioModificar.value.fecha_expiracionM,
      estado: this.formularioModificar.value.estadoM,
    }

    this.cargando = true;
    this.btnSave = false;

    this.ruimsServices.updateRuims(formData, this.idRuims)
      .subscribe({

        next: ({ message }) => {
          $('#myModal_editar_ruims').modal('hide');
          this.indexRuims();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Modificación Correcta!',
            text: `${message}`,
            showConfirmButton: false,
            timer: 2000
          })
        },
        error: (err: any) => {
          console.log(err);
          this.cargando = false;
          this.btnSave = true;
          Swal.fire('Error', err.error.message, 'error')
        },
        complete: () => {
          this.cargando = false;
          this.btnSave = true;
        }

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

  /**
  * destroyPersona
  */
  public destroyRuim(id: number, nro_id_mineria: string, sector: string, estado: string) {

    if (estado === 'no habilitado') {
      this.toastr.error('Este servidor ya ha sido deshabilitado', 'Control de relagias mineras')
    } else {
      Swal.fire({
        title: 'Se deshabilitara a:',
        text: `${nro_id_mineria + ' ' + sector}`,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar!',
        confirmButtonText: 'Si, deshabilitar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ruimsServices.destroyRuim(id)
            .subscribe({
              next: ({ status }) => {
                if (status === 'success') {
                  this.indexRuims();
                  Swal.fire(
                    `${nro_id_mineria + ' ' + sector}`,
                    `A sido deshabilitado correctamente`,
                    'success'
                  );
                }
              },
              error: (err) => {
                this.cargando = false;
                Swal.fire('Error', err.error.message, 'error')
              }
            });
        }
      })
    }
  }


  /**
  * Formulario buscar servidor publico
  */
  public submitSearch() {

    // this.cargandoBuscar = true;
    this.searchTerm$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.OnDestroy$)
    )
      .subscribe(texto => {
        console.log(texto);

        localStorage.setItem('textoBuscar', texto);

        if (texto.length === 0) {
          this.indexServidores();
          localStorage.removeItem('textoBuscar');
        } else {
          const formData: { servidor: string } = {
            servidor: texto
          }
          this.cargando = true;
          this.sevidorServices.searchServidoresPublicos(formData)
            .subscribe(({ servidores }) => {

              const {
                data,
                current_page,
                first_page_url,
                from,
                last_page,
                last_page_url,
                next_page_url,
                path,
                per_page,
                prev_page_url,
                to,
                total
              } = servidores;

              this.dataServidores = data;
              console.log(this.dataServidores);


              this.current_page = current_page;
              this.first_page_url = first_page_url;
              this.from = from;
              this.last_page = last_page;
              this.last_page_url = last_page_url;
              this.next_page_url = next_page_url;
              this.path = path;
              this.per_page = per_page;
              this.prev_page_url = prev_page_url;
              this.to = to;
              this.total = total;

              this.p = this.current_page;

              this.cargando = false;

              // Para paginación
              localStorage.setItem('position', `${this.p}`);
              localStorage.setItem('items', `${this.total}`);
            })
        }
      });
  }

  /**
   * pageChange(event)  
   */
  public pageChange(event: any) {

    this.dataServidores = [];
    this.cargando = true;
    this.p = event;

    // Condicion si es para el textoBuscar
    const textoBuscar = localStorage.getItem('textoBuscar');

    // 
    if (textoBuscar != null) {

      const formData: { servidor: string, page: number } = {
        servidor: textoBuscar,
        page: this.p
      }

      this.cargando = true;
      this.sevidorServices.searchServidoresPublicos(formData)
        .subscribe(({ servidores }) => {

          const {
            data,
            current_page,
            first_page_url,
            from,
            last_page,
            last_page_url,
            next_page_url,
            path,
            per_page,
            prev_page_url,
            to,
            total
          } = servidores;

          this.dataServidores = data;
          console.log(this.dataServidores);


          this.current_page = current_page;
          this.first_page_url = first_page_url;
          this.from = from;
          this.last_page = last_page;
          this.last_page_url = last_page_url;
          this.next_page_url = next_page_url;
          this.path = path;
          this.per_page = per_page;
          this.prev_page_url = prev_page_url;
          this.to = to;
          this.total = total;

          this.p = this.current_page;

          this.cargando = false;

          // Para paginación
          localStorage.setItem('position', `${this.p}`);
          localStorage.setItem('items', `${this.total}`);
        })

    } else {
      const formData: { page: number } = {
        page: this.p
      }
      this.sevidorServices.paginateServidores(formData)
        .subscribe(({ servidores }) => {

          const {
            data,
            current_page,
            first_page_url,
            from,
            last_page,
            last_page_url,
            next_page_url,
            path,
            per_page,
            prev_page_url,
            to,
            total
          } = servidores;

          this.dataServidores = data;

          this.current_page = current_page;
          this.first_page_url = first_page_url;
          this.from = from;
          this.last_page = last_page;
          this.last_page_url = last_page_url;
          this.next_page_url = next_page_url;
          this.path = path;
          this.per_page = per_page;
          this.prev_page_url = prev_page_url;
          this.to = to;
          this.total = total;

          this.cargando = false;

          // Para paginación
          localStorage.setItem('position', `${this.p}`);
          localStorage.setItem('items', `${this.total}`);
        })
    }

  }

  /**
   * eliminarLocalStorage
   */
  public eliminarLocalStorage() {
    localStorage.removeItem('textoBuscar');
    localStorage.removeItem('items');
    localStorage.removeItem('position');
  }



}
