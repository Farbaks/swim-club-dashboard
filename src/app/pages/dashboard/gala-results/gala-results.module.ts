import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalaResultsRoutingModule } from './gala-results-routing.module';
import { GalaResultsComponent } from './gala-results.component';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { GalaResultModalModule } from 'src/app/components/modals/gala-result-modal/gala-result-modal.module';
import { AvatarModule } from 'ngx-avatars';
import { NzEmptyModule } from 'ng-zorro-antd/empty';


@NgModule({
    declarations: [
        GalaResultsComponent
    ],
    imports: [
        CommonModule,
        GalaResultsRoutingModule,
        FormsModule,
        NzIconModule,
        AvatarModule,
        NzEmptyModule,
        GalaResultModalModule
    ]
})
export class GalaResultsModule { }
