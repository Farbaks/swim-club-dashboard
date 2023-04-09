import { Injectable } from '@angular/core';
import { Training, TrainingPerformance } from '../models/training';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    constructor(
        private apiService: ApiService
    ) { }

    create(data: Training) {
        return this.apiService.post('trainings', data);
    }

    updateTraining(data: Training, id: string) {
        return this.apiService.put(`trainings/${id}`, data);
    }

    deleteTraining(id: string) {
        return this.apiService.delete(`trainings/${id}`);
    }

    getTrainings(page: number, limit: number, squad: string, query: string) {
        return this.apiService.get(`trainings?page=${page}&limit=${limit}&squad=${squad}&query=${query}`);
    }

    getStrokes() {
        return this.apiService.get(`strokes`);
    }

    // Training Performance

    createPerformance(data: TrainingPerformance) {
        return this.apiService.post(`training-performances`, data);
    }

    updateTrainingPerformance(data: TrainingPerformance, id: string) {
        return this.apiService.put(`training-performances/${id}`, data);
    }

    deleteTrainingPerformance(id: string) {
        return this.apiService.delete(`training-performances/${id}`);
    }

    getTrainingPerformances(page: number, limit: number, squad: string, training: string, stroke: string, query: string) {
        return this.apiService.get(`training-performances?page=${page}&limit=${limit}&squad=${squad}&training=${training}&stroke=${stroke}&query=${query}`);
    }
}
