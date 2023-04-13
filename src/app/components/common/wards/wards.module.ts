import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WardsComponent } from './wards.component';
import { WardModalModule } from '../../modals/ward-modal/ward-modal.module';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'ngx-avatars';
import { NzEmptyModule } from 'ng-zorro-antd/empty';



@NgModule({
    declarations: [
        WardsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NzEmptyModule,
        WardModalModule,
    ],
    exports: [
        WardsComponent
    ]
})
export class WardsModule { }
