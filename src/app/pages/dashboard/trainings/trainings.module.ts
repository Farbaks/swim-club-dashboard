import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { TrainingsComponent } from './trainings.component';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'ngx-avatars';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrainingsModalModule } from 'src/app/components/modals/trainings-modal/trainings-modal.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        TrainingsComponent
    ],
    imports: [
        CommonModule,
        TrainingsRoutingModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NgxPaginationModule,
        TrainingsModalModule,
        NzEmptyModule,
        SharedModule
    ]
})
export class TrainingsModule { }
