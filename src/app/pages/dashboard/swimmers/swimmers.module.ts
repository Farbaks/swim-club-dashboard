import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwimmersRoutingModule } from './swimmers-routing.module';
import { SwimmersComponent } from './swimmers.component';


@NgModule({
  declarations: [
    SwimmersComponent
  ],
  imports: [
    CommonModule,
    SwimmersRoutingModule
  ]
})
export class SwimmersModule { }
