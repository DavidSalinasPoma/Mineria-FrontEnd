import { Injectable } from '@angular/core';

// Para manejar las peticiones http// 
import { HttpClient } from '@angular/common/http';

// El tap un efecto secuendario
import { tap, map } from "rxjs/operators";
import { Observable, of } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';


// Modelo usuarios
import { Usuario } from '../models/usuario.models';
import { ServidorInterface } from '../models/servidor.model';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
  ) { }

  // Token de usuario
  get token() {
    let tokenActual: any;
    const infoToken = localStorage.getItem('token');
    if (infoToken) {
      const { token } = JSON.parse(infoToken);
      tokenActual = token;
    }
    return tokenActual;
  }

  // Servicio para el login
  /**
   * login
   */
  public login(formData: Usuario) {
    // console.log(formData);
    return this.http.post(`${base_url}/api/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', JSON.stringify(resp))
        })
      )
  }

  /**
   * ValidarToken
   */
  public validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    // Implementando rxjs
    let tokenInfo$: Observable<string>;
    tokenInfo$ = of(token);
    return tokenInfo$.pipe(
      tap((resp: any) => {
        // console.log(resp);
        if (resp != '') {
          localStorage.setItem('token', resp);
        }
      }),
      map((resp: any) => (resp === '') ? false : true)
    );

  }

  /**
   * Servicio para cambio de password
   */
  public loginChangesPassword(formData: any) {

    return this.http.post<any>(`${base_url}/api/login`, formData);

  }

  /**
   * Actualizacion de password
   */
  public updateChangesPassword(password: any) {

    return this.http.post<ServidorInterface>(base_url + '/api/user/changespassword', password);

  }


}
