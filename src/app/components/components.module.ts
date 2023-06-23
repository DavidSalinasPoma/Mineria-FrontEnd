import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { InterceptorComponent } from './interceptor/interceptor.component';


@NgModule({
  declarations: [
    InterceptorComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ],
  exports: [
    InterceptorComponent
  ]
})
export class ComponentsModule { }
