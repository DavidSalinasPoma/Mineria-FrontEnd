import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';


// Mudulo de auth
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

// Componentes principales de APP
import { AppComponent } from './app.component';
import { NopagescomponentComponent } from './nopagescomponent/nopagescomponent.component';

// Para peticiones HTTP
import { HttpClientModule } from '@angular/common/http';

// Formulario reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Para utilizar rutas
import { RouterModule } from '@angular/router';

// Para refrescar la pagina WEB
import { LocationStrategy, HashLocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NopagescomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    RouterModule,
    PagesModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    // Para el lenguaje español
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
