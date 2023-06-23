import { Injectable } from '@angular/core';

// Para manejar las peticiones http// 
import { HttpClient, HttpParams } from '@angular/common/http';


// Variables globales
import { environment } from './../../environments/environment';


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
    private http: HttpClient
  ) { }

  /**
 * Store servidores publicos 
 */
  public storeServidoresPublicos(reuniones: any) {

    /*
       Antes sin interceptores
        let headers = new HttpHeaders();
        headers = headers.set('token-usuario', this.token);
        const options = { headers: headers };
        return this.http.post<any>(base_url + '/api/servidores', reuniones, options);
    */

    // Ahora con interceptores
    return this.http.post<any>(base_url + '/api/servidores', reuniones);

  }

  /**
* Store servidores publicos 
*/
  public indexServidoresPublicos(page: number) {

    // Manda parametros por params(URL) -  https://reqres.in/api/user?page=2
    let params = new HttpParams()
    params = params.set('page', page.toString())

    const options = { params: params };

    return this.http.get<any>(base_url + `/api/servidores`, options);
  }

  /**
 * ShowReuniones
 */
  public showServidoresPublicos(id: number) {

    return this.http.get<any>(base_url + `/api/servidores/${id}`);
  }

  /**
   * updateServidores
   */
  public updateServidores(updateDatos: any, id: number) {

    return this.http.put<any>(base_url + `/api/servidores/${id}`, updateDatos);

  }

  /**
   * eliminar Servidor
   */
  public destroyServidorPublico(id: number) {

    return this.http.delete<any>(base_url + '/api/servidores/' + id);

  }

  /**
   * Buscar servidores publicos
   */
  public searchServidoresPublicos(servidor: any) {

    return this.http.post<any>(base_url + '/api/servidores/buscarservidores', servidor);

  }

  /**
   * paginateServidores
   */
  public paginateServidores(formData: any) {

    // Manda parametros por params(URL) -  https://reqres.in/api/user?page=2
    let params = new HttpParams()
    params = params.set('page', (formData.page).toString())

    const options = { params: params };

    return this.http.get<any>(base_url + '/api/servidores', options);
  }

}
