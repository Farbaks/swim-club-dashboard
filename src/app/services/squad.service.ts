import { Injectable } from '@angular/core';
import { AddSquadMember, Squad } from '../models/squad';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SquadService {

    constructor(private apiService: ApiService) { }

    createSquad(data: Squad) {
        return this.apiService.post('squads', data);
    }

    updateSquad(data: Squad, id:string) {
        return this.apiService.put(`squads/${id}`, data);
    }

    getSquads(page: number, limit: number, query: string) {
        return this.apiService.get(`squads?page=${page}&limit=${limit}&query=${query}`);
    }

    addSquadMember(data: AddSquadMember, squadId: string) {
        return this.apiService.post(`squads/${squadId}/members`, data);
    }

    getSquadMembers(squadId: string, page: number, limit: number, query: string) {
        return this.apiService.get(`squads/${squadId}/members?page=${page}&limit=${limit}&query=${query}`);
    }

    getAllSquadMembers() {
        return this.apiService.get(`squads-members`);
    }

    removeSquadMember(squadId: string, squadMemberId: number) {
        return this.apiService.delete(`squads/${squadId}/members/${squadMemberId}`);
    }
}
