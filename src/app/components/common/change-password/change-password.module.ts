import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../error-message/error-message.module';



@NgModule({
    declarations: [
        ChangePasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
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
        ChangePasswordComponent
    ]
})
export class ChangePasswordModule { }
