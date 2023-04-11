import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaResultsRoutingModule } from './gala-results-routing.module';
import { GalaResultsComponent } from './gala-results.component';


@NgModule({
  declarations: [
    GalaResultsComponent
  ],
  imports: [
    CommonModule,
    GalaResultsRoutingModule
  ]
})
export class GalaResultsModule { }
