import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(
        private notification: NzNotificationService,
        private userService: UserService
    ) { }

    showSuccessMessage(title: string, message?: string): void {
        this.notification.create(
            'success',
            title,
            message ? message : ''
        );
    }

    showErrorMessage(title: string, message?: string): void {
        this.notification.create(
            'error',
            title,
            message ? message : ''
        );
    }

    async refreshUser() {
        try {
            let res: any = await (this.userService.refreshToken()).toPromise();
            this.saveUser(res);
        }
        catch (e) { }
    }


    saveUser(user: any) {
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        let res: any = sessionStorage.getItem('user') ?? undefined;

        if (!res || res == '') {
            return undefined
        }

        return (JSON.parse(res)).data;
    }

    getToken() {
        let res: any = sessionStorage.getItem('user') ?? undefined;

        if (!res || res == '') {
            return ''
        }

        return (JSON.parse(res)).apiToken;
    }

    logoutUser() {
        sessionStorage.clear();
        window.location.replace('/signin');
    }
}
