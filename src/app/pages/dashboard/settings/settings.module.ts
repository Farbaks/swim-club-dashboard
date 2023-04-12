import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProfileModule } from 'src/app/components/common/profile/profile.module';
import { ChangePasswordModule } from 'src/app/components/common/change-password/change-password.module';
import { WardsModule } from 'src/app/components/common/wards/wards.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    NzTabsModule,
    ProfileModule,
    ChangePasswordModule,
    WardsModule
  ]
})
export class SettingsModule { }
