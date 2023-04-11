import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalasRoutingModule } from './galas-routing.module';
import { GalasComponent } from './galas.component';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { GalaModalModule } from 'src/app/components/modals/gala-modal/gala-modal.module';


@NgModule({
    declarations: [
        GalasComponent
    ],
    imports: [
        CommonModule,
        GalasRoutingModule,
        FormsModule,
        NzIconModule,
        NgxPaginationModule,
        GalaModalModule
    ]
})
export class GalasModule { }
