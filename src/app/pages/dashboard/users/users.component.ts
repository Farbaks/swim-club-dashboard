import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    role: '' | 'admin' | 'coach' | 'swimmer' | 'parent' = '';
    query: string = '';
    page: number = 1;
    limit: number = 20;
    totalCount: number = 0;
    users: Array<any> = [];
    showUserModal: boolean = false;
    userAction: 'new' | 'edit' = 'new';
    selectedUser:any;
    constructor(private userService: UserService) {
        this.getUsers();
    }

    selectTab(tab: '' | 'admin' | 'coach' | 'swimmer' | 'parent') {
        this.role = tab;
        this.getUsers();
    }

    pageChanged(page: number) {
        this.page = page;
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers((this.page - 1), this.limit, this.role, this.query).subscribe({
            next: (res:any) => {
                this.users = res.data;
                this.totalCount = res.pagination.count;
            }
        })
    }

    toggleUserModal(action: 'new' | 'edit', user?:any) {
        this.selectedUser = user;
        this.userAction = action;
        this.showUserModal = true;
    }
}
