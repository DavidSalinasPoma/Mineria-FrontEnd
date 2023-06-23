import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componetes de PAGES
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { UserComponent } from './usuarios/user/user.component';
import { ServidoresPublicosComponent } from './usuarios/servidores-publicos/servidores-publicos.component';
import { RuimComponent } from './usuarios/ruim/ruim.component';

const routes: Routes = [
    // Home
    { path: '', component: DashboardComponent, data: { titulo: 'Panel de Control' } }, // Path inicial
    { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'usuarios', component: UserComponent, data: { titulo: 'Gestión de usuarios' } },
    { path: 'servidores', component: ServidoresPublicosComponent, data: { titulo: 'Gestión de servidores publicos' } },
    { path: 'ruim', component: RuimComponent, data: { titulo: 'Registro unico de identificación minera' } },
    // { path: 'pormotivo', component: PormotivoComponent, data: { titulo: 'Reporte por Motivo' } },
    // { path: 'rangofechas', component: RangofechaComponent, data: { titulo: 'Reporte por rango de fechas' } },
    // { path: 'estadoreunion', component: EstadoreunionComponent, data: { titulo: 'Reporte por estado reunión' } },
    // { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Registro de usuarios' } }, 
    // { path: 'correspondencia', component: CorrespondenciaComponent, data: { titulo: 'Correspondencia' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }