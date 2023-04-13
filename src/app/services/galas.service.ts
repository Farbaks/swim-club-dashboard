import { Injectable } from '@angular/core';
import { Gala, GalaGroup, GalaGroupMember, GalaMemberPerformance } from '../models/gala';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GalasService {

    constructor(
        private apiService: ApiService
    ) { }

    createGala(data: Gala) {
        return this.apiService.post('galas', data);
    }

    updateGala(data: Gala, id: string) {
        return this.apiService.put(`galas/${id}`, data);
    }

    deleteGala(id: string) {
        return this.apiService.delete(`galas/${id}`);
    }

    getGalas(page: number, limit: number, query: string) {
        return this.apiService.get(`galas?page=${page}&limit=${limit}&query=${query}`);
    }

    getAllGalas() {
        return this.apiService.get(`all-galas`);
    }

    getOneGala(id:string) {
        return this.apiService.get(`galas/${id}`);
    }
    // 
    createGalaGroup(data: GalaGroup) {
        return this.apiService.post('gala-groups', data);
    }

    updateGalaGroup(data: GalaGroup, id: string) {
        return this.apiService.put(`gala-groups/${id}`, data);
    }

    deleteGalaGroup(id: string) {
        return this.apiService.delete(`gala-groups/${id}`);
    }

    getGalaGroups(galaId:string, page: number, limit: number, query: string) {
        return this.apiService.get(`galas/${galaId}/groups?page=${page}&limit=${limit}&query=${query}`);
    }
    // 
    createGalaGroupMembers(data: GalaGroupMember) {
        return this.apiService.post('gala-members', data);
    }

    updateGalaGroupMember(data: GalaMemberPerformance, id:string) {
        return this.apiService.put(`gala-members/${id}`, data);
    }

    deleteGalaGroupMember(id: string) {
        return this.apiService.delete(`gala-members/${id}`);
    }
}
