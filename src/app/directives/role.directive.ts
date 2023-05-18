import { Directive, ElementRef, Input } from '@angular/core';
import { GeneralService } from '../services/general.service';

@Directive({
    selector: '[allowedRoles]'
})
export class RoleDirective {
    user:any;
    @Input() allowedRoles: Array<string> = [];
    constructor(
        private elRef: ElementRef,
        private generalService: GeneralService
    ) {
        
    }

    ngOnInit() {
        this.getUserInfo();
    }

    getUserInfo() {
        this.user = this.generalService.getUser();
        if(!this.allowedRoles.includes(this.user.role) ) {
            
            this.elRef.nativeElement.style.display = "none";
        }
    }

}
