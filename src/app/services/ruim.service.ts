import { Injectable } from '@angular/core';

// Variables globales
import { environment } from './../../environments/environment';

// Peticiones HTTP
import { HttpClient, HttpParams } from '@angular/common/http';

// Modelos
import { RuimInterface } from '../models/ruim.model';

// Variables globales
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RuimService {

  constructor(
    private http: HttpClient
  ) { }

  /**
  * Store Ruims 
  */
  public storeRuims(ruimsData: RuimInterface) {

    // Ahora con interceptores
    return this.http.post<any>(base_url + '/api/ruims', ruimsData);

  }

  /**
  * Index RUIMS 
  */
  public indexRuims(page: number) {

    // Manda parametros por params(URL) -  https://reqres.in/api/user?page=2
    let params = new HttpParams()
    params = params.set('page', page.toString())

    const options = { params: params };

    return this.http.get<any>(base_url + `/api/ruims`, options);
  }

  /**
  * Buscar RUIMS
  */
  public searchRuims(ruims: any) {

    // Ahora con interceptores
    return this.http.post<any>(base_url + '/api/ruims/buscarruims', ruims);

  }

  /**
  * ShowRuims
  */
  public showRuims(id: number) {

    // Ahora con interceptores
    return this.http.get<any>(base_url + `/api/ruims/${id}`);
  }

  /**
  * updateRuims
  */
  public updateRuims(ruimsData: RuimInterface, id: number) {
    return this.http.put<any>(base_url + `/api/ruims/${id}`, ruimsData);
  }

  /**
  * eliminar Servidor
  */
  public destroyRuim(id: number) {

    return this.http.delete<any>(base_url + `/api/ruims/${id}`);

  }


}
