import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Formularios reactivos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Para peticiones de http
import { HttpClientModule } from "@angular/common/http";

// Componentes de Auth
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Notificaciones
import { ToastrModule } from 'ngx-toastr';

// Modulos internos
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    SharedModule

  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
