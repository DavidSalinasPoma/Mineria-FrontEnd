import { Component, OnInit } from '@angular/core';

// Servicio PruebaService
import { PruebasService } from 'src/app/services/pruebas.service';


@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  styleUrls: ['./interceptor.component.css']
})
export class InterceptorComponent implements OnInit {

  constructor(
    private pruebasServices: PruebasService
  ) { }

  ngOnInit(): void {

    this.pruebasServices.obtenerUsuario()
      .subscribe(resp => {
        console.log(resp);

      });

  }

}

/*

    Nueva forma de hacer subscribe
    .subscribe({
      next: ({ }) => {
        console.log(resp);

      },
      error: (err: any) => {

      },
      complete: () => {

      }
    });

 */