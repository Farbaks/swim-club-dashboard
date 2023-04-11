import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalasService } from 'src/app/services/galas.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-gala-details',
    templateUrl: './gala-details.component.html',
    styleUrls: ['./gala-details.component.scss']
})
export class GalaDetailsComponent {
    galaId: string = '';
    gala: any;
    // 
    query: string = '';
    page: number = 1;
    limit: number = 20;
    totalCount: number = 0;
    // 
    groups: Array<any> = [];
    showGroupModal: boolean = false;
    groupAction: 'new' | 'edit' = 'new';
    selectedGroup: any;
    showGroupDetails: boolean = false;
    // 
    swimmers: Array<any> = [];
    // 
    showGroupMemberModal: boolean = false;
    groupMembersQuery: string = '';
    groupMembers: Array<any> = [];
    memberPage: number = 1;
    memberLimit: number = 20;
    memberTotalCount: number = 0;
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private galaService: GalasService,
        private generalService: GeneralService
    ) {
        this.galaId = this.route.snapshot.params['id'];
        this.getGala();
        this.getGalaGroups();
        this.getSwimmers();
    }


    pageChanged(page: number) {
        this.page = page;
        this.getGalaGroups();
    }

    getSwimmers() {
        this.userService.getUsers((this.page - 1), 1000, 'swimmer', '').subscribe({
            next: (res: any) => {
                this.swimmers = res.data;
            }
        })
    }

    getGala() {
        this.galaService.getOneGala(this.galaId).subscribe({
            next: (res: any) => {
                this.gala = res.data;
            }
        })
    }

    getGalaGroups() {
        this.galaService.getGalaGroups(this.galaId, (this.page - 1), this.limit, this.query).subscribe({
            next: (res: any) => {
                this.groups = res.data;

                if (this.selectedGroup) {
                    this.selectedGroup = this.groups.find((squad: any) => squad.id == this.selectedGroup.id)
                }
            }
        })
    }

    getGroupMembers() {
        this.groupMembers = [];
        this.groupMembers = this.selectedGroup.race_members;
        this.memberTotalCount = this.groupMembers.length;
    }

    toggleGroupModal(action: 'new' | 'edit') {
        if (action == 'new') this.selectedGroup = undefined;
        this.groupAction = action;
        this.showGroupModal = true;
    }

    toggleGroupDetails(squad?: any) {
        this.selectedGroup = squad;
        this.getGroupMembers();
        this.showGroupDetails = true;
    }

    refresh(type: 'new' | 'edit') {
        if (type == 'new') {
            this.selectedGroup = undefined;
            this.showGroupDetails = false;
        }

        this.getGalaGroups();
    }

    removeMember(memberId: string) {

        this.galaService.deleteGalaGroupMember(memberId).subscribe({
            next: (res: any) => {

                if (!/^20.*/.test(res.status)) {
                    this.generalService.showErrorMessage(res.message);
                    return;
                }

                this.generalService.showSuccessMessage('Group member removed successfully.');
                this.getGalaGroups();
                this.getGroupMembers();

            },
            error: (e: any) => {
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
