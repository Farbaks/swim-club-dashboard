import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalaGroupMemberModalComponent } from './gala-group-member-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../common/error-message/error-message.module';
import { NzRadioModule } from 'ng-zorro-antd/radio';


@NgModule({
    declarations: [
        GalaGroupMemberModalComponent
    ],
    imports: [
        CommonModule,
        NzModalModule,
        FormsModule,
        ReactiveFormsModule,
        NzIconModule,
        NzRadioModule,
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
        GalaGroupMemberModalComponent
    ]
})
export class GalaGroupMemberModalModule { }
