import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquadsRoutingModule } from './squads-routing.module';
import { SquadsComponent } from './squads.component';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AvatarModule } from 'ngx-avatars';
import { NgxPaginationModule } from 'ngx-pagination';
import { SquadModalModule } from 'src/app/components/modals/squad-modal/squad-modal.module';
import { SquadMemberModalModule } from 'src/app/components/modals/squad-member-modal/squad-member-modal.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        SquadsComponent,
    ],
    imports: [
        CommonModule,
        SquadsRoutingModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NgxPaginationModule,
        NzEmptyModule,
        SquadModalModule,
        SquadMemberModalModule,
        SharedModule
    ]
})
export class SquadsModule { }
