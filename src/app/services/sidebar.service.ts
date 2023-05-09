import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Principal', url: '/' },
        { titulo: 'Reportes', url: 'reportes' },
        // { titulo: 'Configuraciones', url: 'progress' },
        // { titulo: 'Gráficas', url: 'grafica1' },
      ]
    },
    {
      titulo: 'Provincias',
      icono: 'mdi mdi-file-document',
      submenu: [
        { titulo: 'Registro', url: 'facturas' },
        { titulo: 'Lista', url: 'factpagadas' },
      ]
    },
    {
      titulo: 'Municipios',
      icono: 'mdi mdi-chart-line',
      submenu: [
        { titulo: 'Registro', url: 'consumos' },
        { titulo: 'Lista', url: 'consumos' },
      ]
    },
    {
      titulo: 'Areas Protegidas',
      icono: 'mdi mdi-account-multiple-plus',
      submenu: [
        { titulo: 'Registro', url: 'socios' },
        { titulo: 'Lista', url: 'personas' },
      ]
    },

    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-clipboard-text',
      submenu: [
        { titulo: 'Usuarios', url: 'usuario' },
        { titulo: 'Roles', url: 'servicios' },
      ]
    },

    // {
    //   titulo: 'Configuraciónes',
    //   icono: 'mdi mdi-account-settings-variant',
    //   submenu: [
    //     { titulo: 'Permiso', url: 'permisos' },
    //     { titulo: 'Roles', url: 'roles' },
    //     { titulo: 'Usuarios', url: 'usuarios' },
    //   ]
    // },

  ];

  constructor() { }
}
