import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwimmersComponent } from './swimmers.component';

const routes: Routes = [{ path: '', component: SwimmersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwimmersRoutingModule { }
