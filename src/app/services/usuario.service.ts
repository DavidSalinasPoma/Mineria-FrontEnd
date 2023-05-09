import { Injectable } from '@angular/core';

// Para manejar las peticiones http// 
import { HttpClient, HttpHeaders } from '@angular/common/http';

// El tap un efecto secuendario
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of, Subject } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';

import { Router } from '@angular/router';

// Modelo usuarios
import { Usuario } from '../models/usuario.models';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private router: Router,
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
      map(resp => (resp === '') ? false : true)
    );

  }

}
