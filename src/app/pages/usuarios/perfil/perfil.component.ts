import { Component, OnInit, EventEmitter, Output } from '@angular/core';


// Utilizando jquery
declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Output() confirmado = new EventEmitter<boolean>(); // Emite un evento para indicar que se ha confirmado la acción

  // Información de usuario de sistema
  public usuario: any;
  public token: any;
  public rol: any;



  constructor() { }

  ngOnInit(): void {

    const user = localStorage.getItem('token');
    if (user) {
      const { token, identity } = JSON.parse(user);
      this.usuario = identity;
      this.token = token;
      this.rol = identity.rol;
    }

  }

  // Modal global
  mostrarModal = false;

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
  // FIN Modal global

}
