import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrainingPerformance } from 'src/app/models/training';
import { GeneralService } from 'src/app/services/general.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-performance-modal',
  templateUrl: './training-performance-modal.component.html',
  styleUrls: ['./training-performance-modal.component.scss']
})
export class TrainingPerformanceModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() strokes: Array<any> = [];
    @Input() squadMembers: Array<any> = [];
    @Input() trainings: Array<any> = [];
    @Input() performance: any;
    
    @Input() action: 'new' | 'edit' = 'new';
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
    @Output() actionSuccessful: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private trainingService: TrainingService,
        private generalService: GeneralService,
    ) {

    }

    ngOnChanges() {
        this.errorMessage = '';
        this.form = this.fb.group({
            time: ['', Validators.required],
            points: ['', Validators.required],
            strokeId: ['', Validators.required],
            trainingId: ['', Validators.required],
            squadMemberId: ['', Validators.required],
            trainingDate: ['', Validators.required]
        })

        if (this.performance) {
            this.form.get('time')!.setValue(this.performance.time)
            this.form.get('points')!.setValue(this.performance.points)
            this.form.get('strokeId')!.setValue(this.performance.strokeId)
            this.form.get('trainingId')!.setValue(this.performance.trainingId)
            this.form.get('squadMemberId')!.setValue(this.performance.squadMemberId)
            this.form.get('trainingDate')!.setValue(this.performance.trainingDate)
            this.form!.updateValueAndValidity();
            return;
        }


    }

    get title() {
        return this.action == 'new' ? 'Add new performance' : 'Edit performance';
    }

    get buttonText() {
        return this.action == 'new' ? 'Create performance' : 'Update performance';
    }

    handleCancel() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    submit() {
        if (this.processLoading) return;

        this.form.markAllAsTouched();
        this.form.markAsDirty();

        this.errorMessage = '';

        if (!this.form.valid) {
            this.errorMessage = 'Please enter all fields.'
            return;
        }

        this.processLoading = true;
        let data = new TrainingPerformance();
        data = {
            ...data,
            ...this.form.value,
        }

        if(this.action == 'new') {
            this.trainingService.createPerformance(data).subscribe({
                next: (res: any) => {
                    this.processLoading = false;
    
                    if (!/^20.*/.test(res.status)) {
                        this.errorMessage = res.message;
                        return;
                    }
    
                    this.generalService.showSuccessMessage('Training performance created successfully.');
                    this.actionSuccessful.emit();
                    this.handleCancel();
                },
                error: (e: any) => {
                    this.processLoading = false;
                    console.log(e)
                    this.generalService.showErrorMessage(e.errors.message)
                }
            })
            return;
        }

        this.trainingService.updateTrainingPerformance(data, this.performance.id).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Training performance updated successfully.');
                this.actionSuccessful.emit();
                this.handleCancel();
            },
            error: (error: any) => {
                this.processLoading = false;
                this.errorMessage = error;
                this.generalService.showErrorMessage(error)
            }
        })
    }
}
