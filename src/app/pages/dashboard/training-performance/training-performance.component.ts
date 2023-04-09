import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { SquadService } from 'src/app/services/squad.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
    selector: 'app-training-performance',
    templateUrl: './training-performance.component.html',
    styleUrls: ['./training-performance.component.scss']
})
export class TrainingPerformanceComponent {
    query: string = '';
    page: number = 1;
    limit: number = 20;
    totalCount: number = 0;
    // 
    trainings: Array<any> = [];
    selectedTraining: string = '';
    // 
    strokes: Array<any> = [];
    selectedStroke: string = '';
    // 
    squads: Array<any> = [];
    selectedSquad: string = '';
    // 
    squadMembers: Array<any> = [];
    // 
    trainingPerformances: Array<any> = [];
    selectedPerformance: any;
    // 
    showPerformanceModal: boolean = false;
    trainingAction: 'new' | 'edit' = 'new';

    constructor(
        private squadService: SquadService,
        private trainingService: TrainingService,
        private generalService: GeneralService
    ) {
        this.getTrainingPerformances();
        this.getTrainings();
        this.getSquads();
        this.getSquadMembers();
        this.getStrokes();
    }

    pageChanged(page: number) {
        this.page = page;
        this.getTrainingPerformances();
    }

    getSquads() {
        this.squadService.getSquads(0, 1000, this.query).subscribe({
            next: (res: any) => {
                this.squads = res.data;
            }
        })
    }

    getSquadMembers() {
        this.squadService.getAllSquadMembers().subscribe({
            next: (res: any) => {
                this.squadMembers = res.data;
            }
        })
    }

    getTrainings() {
        this.trainingService.getTrainings(0, 1000, '', this.query).subscribe({
            next: (res: any) => {
                this.trainings = res.data;
            }
        })
    }

    getStrokes() {
        this.trainingService.getStrokes().subscribe({
            next: (res: any) => {
                this.strokes = res.data;
            }
        })
    }

    // 

    getTrainingPerformances() {
        this.trainingService.getTrainingPerformances((this.page - 1), this.limit, this.selectedSquad, this.selectedTraining, this.selectedStroke, this.query).subscribe({
            next: (res: any) => {
                this.trainingPerformances = res.data;
                this.totalCount = res.pagination.count;
            }
        })
    }

    toggleTrainingPerformanceModal(action: 'new' | 'edit', trainingPerformance?: any) {
        this.selectedPerformance = trainingPerformance;
        this.trainingAction = action;
        this.showPerformanceModal = true;
    }

    deleteTrainingPerformance(performanceId: string) {

        this.trainingService.deleteTraining(performanceId).subscribe({
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
