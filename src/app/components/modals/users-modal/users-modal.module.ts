import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModalComponent } from './users-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../common/error-message/error-message.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        UsersModalComponent
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
    exports: [
        UsersModalComponent
    ]
})
export class UsersModalModule { }
