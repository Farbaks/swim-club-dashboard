import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wards',
  templateUrl: './wards.component.html',
  styleUrls: ['./wards.component.scss']
})
export class WardsComponent {
    // 
    wards: Array<any> = [];
    showWardModal: boolean = false;
    wardAction: 'new' | 'edit' = 'new';
    selectedWard: any;
    constructor(
        private userService: UserService,
        private generalService: GeneralService
    ) {
        this.getWards();
    }


    getWards() {
        this.userService.getParentWards().subscribe({
            next: (res: any) => {
                this.wards = res.data;
            }
        })
    }

    toggleWardModal(action: 'new' | 'edit', relationship?:any) {
        this.selectedWard = relationship?.ward;
        this.wardAction = action;
        this.showWardModal = true;
    }
}
