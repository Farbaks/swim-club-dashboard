import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingPerformanceRoutingModule } from './training-performance-routing.module';
import { TrainingPerformanceComponent } from './training-performance.component';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'ngx-avatars';
import { NgxPaginationModule } from 'ngx-pagination';
import { TrainingsModalModule } from 'src/app/components/modals/trainings-modal/trainings-modal.module';
import { TrainingPerformanceModalModule } from 'src/app/components/modals/training-performance-modal/training-performance-modal.module';


@NgModule({
    declarations: [
        TrainingPerformanceComponent
    ],
    imports: [
        CommonModule,
        TrainingPerformanceRoutingModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NgxPaginationModule,
        TrainingPerformanceModalModule
    ]
})
export class TrainingPerformanceModule { }
