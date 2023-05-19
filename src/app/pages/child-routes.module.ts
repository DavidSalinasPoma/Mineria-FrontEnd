import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componetes de PAGES
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { UserComponent } from './usuarios/user/user.component';
import { ServidoresPublicosComponent } from './usuarios/servidores-publicos/servidores-publicos.component';

const routes: Routes = [
    // Home
    { path: '', component: DashboardComponent, data: { titulo: 'Panel de Control' } }, // Path inicial
    { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } }, // Path inicial
    { path: 'usuario', component: UserComponent, data: { titulo: 'Gestión de usuarios' } }, // Path inicial
    { path: 'servidores', component: ServidoresPublicosComponent, data: { titulo: 'Gestión de servidores publicos' } }, // Path inicial
    // { path: 'porfecha', component: PorfechaComponent, data: { titulo: 'Reporte por fecha' } }, // Path inicial
    // { path: 'pormotivo', component: PormotivoComponent, data: { titulo: 'Reporte por Motivo' } }, // Path inicial
    // { path: 'rangofechas', component: RangofechaComponent, data: { titulo: 'Reporte por rango de fechas' } }, // Path inicial
    // { path: 'estadoreunion', component: EstadoreunionComponent, data: { titulo: 'Reporte por estado reunión' } }, // Path inicial
    // { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Registro de usuarios' } }, // Path inicial
    // { path: 'correspondencia', component: CorrespondenciaComponent, data: { titulo: 'Correspondencia' } }, // Path inicial
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }