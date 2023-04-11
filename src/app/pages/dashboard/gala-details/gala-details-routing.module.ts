import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalaDetailsComponent } from './gala-details.component';

const routes: Routes = [{ path: '', component: GalaDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalaDetailsRoutingModule { }
