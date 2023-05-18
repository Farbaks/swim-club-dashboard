import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
    user:any;
    constructor(
        private generalService: GeneralService
    ) {
        
    }

    ngOnInit() {
        this.getUserInfo();
    }

    getUserInfo() {
        this.user = this.generalService.getUser();
    }

}
