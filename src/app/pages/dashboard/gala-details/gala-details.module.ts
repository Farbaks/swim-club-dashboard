import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaDetailsRoutingModule } from './gala-details-routing.module';
import { GalaDetailsComponent } from './gala-details.component';
import { GalaGroupModalModule } from 'src/app/components/modals/gala-group-modal/gala-group-modal.module';
import { GalaGroupMemberModalModule } from 'src/app/components/modals/gala-group-member-modal/gala-group-member-modal.module';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'ngx-avatars';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        GalaDetailsComponent
    ],
    imports: [
        CommonModule,
        GalaDetailsRoutingModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NzBreadCrumbModule,
        NzEmptyModule,
        GalaGroupModalModule,
        GalaGroupMemberModalModule,
        SharedModule
    ]
})
export class GalaDetailsModule { }
