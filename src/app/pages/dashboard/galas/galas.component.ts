import { Component } from '@angular/core';
import { GalasService } from 'src/app/services/galas.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-galas',
    templateUrl: './galas.component.html',
    styleUrls: ['./galas.component.scss']
})
export class GalasComponent {
    
    query: string = '';
    page: number = 1;
    limit: number = 20;
    totalCount: number = 0;
    galas: Array<any> = [];

    showGalaModal: boolean = false;
    galaAction: 'new' | 'edit' = 'new';
    selectedGala: string = '';
    constructor(
        private galaService: GalasService,
        private generalService: GeneralService
    ) {
        this.getGalas();
    }

    pageChanged(page: number) {
        this.page = page;
        this.getGalas();
    }

    getGalas() {
        this.galaService.getGalas((this.page - 1), this.limit, this.query).subscribe({
            next: (res: any) => {
                this.galas = res.data;
                this.totalCount = res.pagination.count;
            }
        })
    }

    toggleGalaModal(action: 'new' | 'edit', training?: any) {
        this.selectedGala = training;
        this.galaAction = action;
        this.showGalaModal = true;
    }

    deleteGala(galaId: string) {

        this.galaService.deleteGala(galaId).subscribe({
            next: (res: any) => {

                if (!/^20.*/.test(res.status)) {
                    this.generalService.showErrorMessage(res.message);
                    return;
                }

                this.generalService.showSuccessMessage('Gala deleted successfully.');
                this.getGalas()

            },
            error: (e: any) => {
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
