import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes de components
import { InterceptorComponent } from './interceptor/interceptor.component';

const routes: Routes = [
  /**** Rutas PUBLICAS Principales como hijas de app-routing.module.ts****/
  { path: 'interceptor', component: InterceptorComponent, data: { titulo: 'Logica para interceptores' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
