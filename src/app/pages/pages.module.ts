import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Para utilizar rutas
import { RouterModule } from '@angular/router';

// Modulos Personalizados
import { SharedModule } from '../shared/shared.module';

// Componentes de Pages
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { UserComponent } from './usuarios/user/user.component';
import { ModalpasswordComponent } from './usuarios/perfil/modalpassword/modalpassword.component';
import { ModalusuarioregisterComponent } from './usuarios/user/modalusuarioregister/modalusuarioregister.component';

// Ng bootstrap para inicializar un modal
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    UserComponent,
    ModalpasswordComponent,
    ModalusuarioregisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    UserComponent
  ]
})
export class PagesModule { }
