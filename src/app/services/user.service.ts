import { Injectable } from '@angular/core';
import { Signin, Signup } from '../models/auth';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private apiService: ApiService
    ) { }

    signup(data: Signup) {
        return this.apiService.post('users', data);
    }

    signin(data: Signin) {
        return this.apiService.post('signin', data);
    }

    refreshToken() {
        return this.apiService.get('users/me');
    }
}
