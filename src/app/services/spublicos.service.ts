import { Injectable } from '@angular/core';

// Para manejar las peticiones http// 
import { HttpClient, HttpHeaders } from '@angular/common/http';

// El tap un efecto secuendario
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of, Subject } from 'rxjs';

// Variables globales
import { environment } from './../../environments/environment';

import { Router } from '@angular/router';

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


// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SpublicosService {

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

  /**
 * Store servidores publicos 
 */
  public storeServidoresPublicos(reuniones: any) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.post<any>(base_url + '/api/servidores', reuniones, { headers: parameters });
  }

  /**
* Store servidores publicos 
*/
  public indexServidoresPublicos() {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.get<any>(base_url + '/api/servidores', { headers: parameters });
  }

  /**
 * ShowReuniones
 */
  public showServidoresPublicos(id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.get<any>(base_url + `/api/servidores/${id}`, { headers: parameters });
  }

  /**
   * updateServidores
   */
  public updateServidores(updateDatos: any, id: number) {
    console.log(updateDatos);

    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.put<any>(base_url + `/api/servidores/${id}`, updateDatos, { headers: parameters });
  }


  /**
   * eliminar Servidor
   */
  public destroyServidorPublico(id: number) {
    let parameters = new HttpHeaders();
    parameters = parameters.set('token-usuario', this.token);
    return this.http.delete<any>(base_url + '/api/servidores/' + id, { headers: parameters });
  }


}
