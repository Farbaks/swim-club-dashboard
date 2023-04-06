import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquadsRoutingModule } from './squads-routing.module';
import { SquadsComponent } from './squads.component';


@NgModule({
  declarations: [
    SquadsComponent
  ],
  imports: [
    CommonModule,
    SquadsRoutingModule
  ]
})
export class SquadsModule { }
