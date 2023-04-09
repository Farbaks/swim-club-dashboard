import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { SquadService } from 'src/app/services/squad.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent {
    selectedSquad: string = '';
    query: string = '';
    page: number = 1;
    limit: number = 20;
    totalCount: number = 0;
    trainings: Array<any> = [];
    squads: Array<any> = [];
    showTrainingModal: boolean = false;
    trainingAction: 'new' | 'edit' = 'new';
    selectedTraining:any;
    constructor(
        private squadService: SquadService,
        private trainingService: TrainingService,
        private generalService: GeneralService
        ) {
        this.getTrainings();
        this.getSquads();
    }

    pageChanged(page: number) {
        this.page = page;
        this.getTrainings();
    }

    getSquads() {
        this.squadService.getSquads(0, 1000, this.query).subscribe({
            next: (res: any) => {
                this.squads = res.data;
            }
        })
    }

    getTrainings() {
        this.trainingService.getTrainings((this.page - 1), this.limit, this.selectedSquad, this.query).subscribe({
            next: (res:any) => {
                this.trainings = res.data;
                this.totalCount = res.pagination.count;
            }
        })
    }

    toggleTrainingModal(action: 'new' | 'edit', training?:any) {
        this.selectedTraining = training;
        this.trainingAction = action;
        this.showTrainingModal = true;
    }

    deleteTraining(trainingId: string) {

        this.trainingService.deleteTraining(trainingId).subscribe({
            next: (res: any) => {

                if (!/^20.*/.test(res.status)) {
                    this.generalService.showErrorMessage(res.message);
                    return;
                }

                this.generalService.showSuccessMessage('Training deleted successfully.');
                this.getTrainings()

            },
            error: (e: any) => {
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
