import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Para utilizar rutas
import { RouterModule } from '@angular/router';

// Modulos Personalizados
import { SharedModule } from '../shared/shared.module';

// Modulo material
import { MaterialModule } from '../material/material.module';

// Paginación
import { NgxPaginationModule } from 'ngx-pagination';

// Componentes de Pages
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { UserComponent } from './usuarios/user/user.component';
import { ServidoresPublicosComponent } from './usuarios/servidores-publicos/servidores-publicos.component';
import { RuimComponent } from './usuarios/ruim/ruim.component';

// Ng bootstrap para inicializar un modal
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    UserComponent,
    ServidoresPublicosComponent,
    RuimComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    UserComponent,
    ServidoresPublicosComponent,
    RuimComponent
  ]
})
export class PagesModule { }
