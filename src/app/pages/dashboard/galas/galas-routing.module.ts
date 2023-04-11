import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalasComponent } from './galas.component';

const routes: Routes = [{ path: '', component: GalasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalasRoutingModule { }
