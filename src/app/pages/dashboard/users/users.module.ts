import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'ngx-avatars';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { UsersModalModule } from 'src/app/components/modals/users-modal/users-modal.module';

@NgModule({
    declarations: [
        UsersComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NgxPaginationModule,
        UsersModalModule
    ]
})
export class UsersModule { }
