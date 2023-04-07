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

    getUsers(page:number, limit:number, role:string, query:string) {
        return this.apiService.get(`users?page=${page}&limit=${limit}&role=${role}&query=${query}`);
    }
}
