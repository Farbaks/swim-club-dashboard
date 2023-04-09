import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { SquadService } from 'src/app/services/squad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-squads',
    templateUrl: './squads.component.html',
    styleUrls: ['./squads.component.scss']
})
export class SquadsComponent {
    query: string = '';
    page: number = 1;
    limit: number = 20;
    totalCount: number = 0;
    squads: Array<any> = [];
    showSquadModal: boolean = false;
    squadAction: 'new' | 'edit' = 'new';
    selectedSquad: any;
    
    coaches: Array<any> = [];
    // 
    swimmers: Array<any> = [];
    showSquadDetails: boolean = false;
    showSquadMemberModal: boolean = false;
    squadMembersQuery: string = '';
    squadMembers: Array<any> = [];
    memberPage: number = 1;
    memberLimit: number = 20;
    memberTotalCount: number = 0;
    constructor(
        private userService: UserService,
        private squadService: SquadService,
        private generalService: GeneralService
    ) {
        this.getSquads();
        this.getCoaches();
        this.getSwimmers();
    }


    pageChanged(page: number) {
        this.page = page;
        this.getSquads();
    }

    getCoaches() {
        this.userService.getUsers((this.page - 1), 1000, 'coach', '').subscribe({
            next: (res: any) => {
                this.coaches = res.data;
            }
        })
    }

    getSwimmers() {
        this.userService.getUsers((this.page - 1), 1000, 'swimmer', '').subscribe({
            next: (res: any) => {
                this.swimmers = res.data;
            }
        })
    }

    getSquads() {
        this.squadService.getSquads((this.page - 1), this.limit, this.query).subscribe({
            next: (res: any) => {
                this.squads = res.data;
                this.totalCount = res.pagination.count;

                if(this.selectedSquad) {
                    this.selectedSquad = this.squads.find((squad:any) => squad.id == this.selectedSquad.id)
                }
            }
        })
    }

    getSquadMembers() {
        this.squadMembers = [];
        this.squadService.getSquadMembers(this.selectedSquad.id, (this.memberPage - 1), this.memberLimit, this.squadMembersQuery).subscribe({
            next: (res: any) => {
                this.squadMembers = res.data;
                this.memberTotalCount = res.pagination.count;
            }
        })
    }

    toggleSquadModal(action: 'new' | 'edit') {
        if(action == 'new') this.selectedSquad = undefined;
        this.squadAction = action;
        this.showSquadModal = true;
    }

    toggleSquadDetails(squad?: any) {
        this.selectedSquad = squad;
        this.getSquadMembers();
        this.showSquadDetails = true;
    }

    refresh(type: 'new' | 'edit') {
        if(type == 'new') { 
            this.selectedSquad = undefined;
            this.showSquadDetails = false;
        }
        
        this.getSquads();
    }

    removeMember(memberId: number) {

        this.squadService.removeSquadMember(this.selectedSquad.id, memberId).subscribe({
            next: (res: any) => {

                if (!/^20.*/.test(res.status)) {
                    this.generalService.showErrorMessage(res.message);
                    return;
                }

                this.generalService.showSuccessMessage('Squad member removed successfully.');
                this.getSquads();
                this.getSquadMembers();

            },
            error: (e: any) => {
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
