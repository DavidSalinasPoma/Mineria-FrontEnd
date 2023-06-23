import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Rutas hijas
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { ComponentsRoutingModule } from './components/components-routing.module';

// Componentes de APP
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';


const routes: Routes = [
  // Si es un path vacio va a redirecionar a -> home y esto a un -> path: '', component: DashboardComponent
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Cualquiera otra ruta que no este definida en este routing va a mostrar NoPagesFound
  { path: '**', component: NopagesfoundComponent },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
    ComponentsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
