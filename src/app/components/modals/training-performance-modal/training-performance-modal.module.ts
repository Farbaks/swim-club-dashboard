import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingPerformanceModalComponent } from './training-performance-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../common/error-message/error-message.module';



@NgModule({
    declarations: [
        TrainingPerformanceModalComponent
    ],
    imports: [
        CommonModule,
        NzModalModule,
        ReactiveFormsModule,
        NzIconModule,
        NzNotificationModule,
        ErrorMessageModule,
        LaddaModule.forRoot({
            style: "zoom-out",
            spinnerSize: 35,
            spinnerColor: "white",
            spinnerLines: 12
        }),
    ],
    exports: [TrainingPerformanceModalComponent]
})
export class TrainingPerformanceModalModule { }
