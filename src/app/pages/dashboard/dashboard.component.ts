import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private location: Location,
    private userService: UserService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.refreshToken();
    this.location.onUrlChange(url => {
        window.scrollTo(0, 0);
        this.refreshToken();
    });
  }

  refreshToken() {
    this.userService.refreshToken().subscribe({
        next:(res:any) => {
            this.generalService.saveUser(res);
        }
    })
  }

}
