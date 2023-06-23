import { Injectable } from '@angular/core';

// Para peticiones http en servicios
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * obtenerUsuario
   */
  public obtenerUsuario() {

    let params = new HttpParams()
    params = params.set('page', '2');
    params = params.set('nombre', 'David Salinas');

    // let headers = new HttpHeaders();
    // headers = headers.set('token-usuario', '123');

    const options = { params: params };

    return this.http.get('https://reqres.in/api/user', options);

  }

  /**
  * obtenerUsuarioExample
  */
  public obtenerUsuarioExample() {

    // Manda parametros por params(URL) -  https://reqres.in/api/user?page=2
    let params = new HttpParams()
    params = params.set('page', '1')
    params = params.set('params1', 'valor1')
    params = params.set('params2', 'valor2')
    params = params.set('page', '1')

    // Manda parametros por header(Cabecera) 
    let headers = new HttpHeaders();
    headers = headers.set('token-usuario', '123');
    headers = headers.set('param1', 'param1');
    headers = headers.set('param2', 'param2');

    const options = { headers: headers, params: params };

    return this.http.get('https://reqres.in/api/user', options);
  }

}
