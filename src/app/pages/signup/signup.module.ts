import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageModule } from 'src/app/components/common/error-message/error-message.module';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
        style: "zoom-out",
        spinnerSize: 35,
        spinnerColor: "white",
        spinnerLines: 12
    }),
  ]
})
export class SignupModule { }
