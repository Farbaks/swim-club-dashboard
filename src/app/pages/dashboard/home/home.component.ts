import { Component } from '@angular/core';
import { GalasService } from 'src/app/services/galas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    query: string = '';
    page: number = 1;
    limit: number = 5;
    totalCount: number = 0;
    galas: Array<any> = [];
    report:any;
    swimmers: Array<any> = [];

    constructor(
        private galaService: GalasService,
        private userService: UserService,
    ) {
        this.getReport();
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

    getReport() {
        this.userService.getReport().subscribe({
            next: (res: any) => {
                this.report = res.data;
            }
        })
    }
}
