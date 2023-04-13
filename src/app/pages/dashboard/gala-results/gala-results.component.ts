import { Component } from '@angular/core';
import { GalasService } from 'src/app/services/galas.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-gala-results',
  templateUrl: './gala-results.component.html',
  styleUrls: ['./gala-results.component.scss']
})
export class GalaResultsComponent {
    galas: Array<any> = [];
    selectedGalaFilter: any = '';
    selectedGala:any;
    // 
    strokes: Array<any> = []
    // 
    selectedGalaResult: any;
    showResultModal: boolean = false;
    constructor(
        private trainingService: TrainingService,
        private galaService: GalasService
    ) {
        this.getStrokes();
        this.getGalas();
    }

    getStrokes() {
        this.trainingService.getStrokes().subscribe({
            next: (res: any) => {
                this.strokes = res.data;
            }
        })
    }

    getGalas() {
        this.galaService.getAllGalas().subscribe({
            next: (res: any) => {
                this.galas = res.data;
            }
        })
    }

    getOneGala() {
        this.galaService.getOneGala(this.selectedGalaFilter.id).subscribe({
            next: (res: any) => {
                this.selectedGala = res.data;
            }
        })
    }

    toggleResultModal(result?:any) {
        this.selectedGalaResult = result;
        this.showResultModal = true;
    }
}
