import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaResultsComponent } from './gala-results.component';

const routes: Routes = [{ path: '', component: GalaResultsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalaResultsRoutingModule { }
