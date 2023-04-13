import { Injectable } from '@angular/core';
import { NewWard, Signin, Signup, UpdatePassword, UpdateUser } from '../models/auth';
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

    getSwimmers(page:number, limit:number, squad:string, query:string) {
        return this.apiService.get(`swimmers?page=${page}&limit=${limit}&squad=${squad}&query=${query}`);
    }

    getUsers(page:number, limit:number, role:string, query:string) {
        return this.apiService.get(`users?page=${page}&limit=${limit}&role=${role}&query=${query}`);
    }

    updateUser(data: UpdateUser) {
        return this.apiService.put('users/me', data);
    }

    updatePassword(data: UpdatePassword) {
        return this.apiService.put('users/password', data);
    }

    // 
    createWard(data: NewWard) {
        return this.apiService.post('users/relationships', data);
    }

    getParentWards() {
        return this.apiService.get('users/relationships');
    }

    updateWard(data: UpdateUser, id:string) {
        return this.apiService.put(`users/relationships/${id}/info`, data);
    }

    
}
