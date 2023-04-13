import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwimmersRoutingModule } from './swimmers-routing.module';
import { SwimmersComponent } from './swimmers.component';
import { FormsModule } from '@angular/forms';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'ngx-avatars';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
        SwimmersComponent
    ],
    imports: [
        CommonModule,
        SwimmersRoutingModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NgxPaginationModule,
        NzEmptyModule
    ]
})
export class SwimmersModule { }
