import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Routing principal
import { AppRoutingModule } from './app-routing.module';

// Mudulo de auth
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

// Modulo de components
import { ComponentsModule } from './components/components.module';

// Componentes principales de APP
import { AppComponent } from './app.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';

// Para peticiones HTTP
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Formulario reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Para utilizar rutas
import { RouterModule } from '@angular/router';

// Para refrescar la pagina WEB
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Manejo de interceptores
import { InterceptorInterceptor } from './interceptor/interceptor.interceptor';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    NopagesfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    RouterModule,
    PagesModule,
    ComponentsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // Para el lenguaje español
    { provide: LOCALE_ID, useValue: 'es' },
    // Manejo de interceptores, multi:true hace que este pendiente a todas las peticiones que se haga
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
