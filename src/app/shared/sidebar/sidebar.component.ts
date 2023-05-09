import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {



  // public usuario: Usuario;
  public menuItems: any[];

  // Para mostrar datos del usuario en el sedebar
  public usuario: any;
  public token: any;
  public rol: any;

  constructor(
    private sidebarServices: SidebarService,
    private router: Router
  ) {
    this.menuItems = this.sidebarServices.menu;
    // this.usuario = usuarioServices.usuario;
    // console.log(this.menuItems);

  }

  ngOnInit(): void {

    const user = localStorage.getItem('token');
    if (user) {
      const { token, identity } = JSON.parse(user);
      this.usuario = identity;
      this.token = token;
      this.rol = identity.rol;
    }
  }


  /**
   * logout
   */
  public logout() {

    localStorage.removeItem('token');

    this.usuario = null;
    this.token = null;

    // Redireccionar al la pagina principal
    this.router.navigate(['/login']);

  }


}
