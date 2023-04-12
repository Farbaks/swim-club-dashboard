import { Component } from '@angular/core';
import { GalasService } from 'src/app/services/galas.service';

@Component({
  selector: 'app-gala-results',
  templateUrl: './gala-results.component.html',
  styleUrls: ['./gala-results.component.scss']
})
export class GalaResultsComponent {
    galas: Array<any> = [];
    selectedGalaFilter: any = '';
    selectedGala:any;
    constructor(
        private galaService: GalasService
    ) {
        this.getGalas();
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
}
