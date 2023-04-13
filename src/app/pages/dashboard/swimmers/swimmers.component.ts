import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { SquadService } from 'src/app/services/squad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-swimmers',
    templateUrl: './swimmers.component.html',
    styleUrls: ['./swimmers.component.scss']
})
export class SwimmersComponent {
    selectedSquad: string = '';
    query: string = '';
    page: number = 1;
    limit: number = 20;
    totalCount: number = 0;
    swimmers: Array<any> = [];
    squads: Array<any> = [];
    constructor(
        private squadService: SquadService,
        private userService: UserService,
        private generalService: GeneralService
    ) {
        this.getSwimmers();
        this.getSquads();
    }

    pageChanged(page: number) {
        this.page = page;
        this.getSwimmers();
    }

    getSquads() {
        this.squadService.getSquads(0, 1000, this.query).subscribe({
            next: (res: any) => {
                this.squads = res.data;
            }
        })
    }

    getSwimmers() {
        this.userService.getSwimmers((this.page - 1), this.limit, this.selectedSquad, this.query).subscribe({
            next: (res: any) => {
                this.swimmers = res.data;
                this.totalCount = res.pagination.count;
            }
        })
    }

    getAgeDifference(date: string) {
        return new Date().getFullYear() - new Date(date).getFullYear();
    }
}
