import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Training } from 'src/app/models/training';
import { GeneralService } from 'src/app/services/general.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
    selector: 'app-trainings-modal',
    templateUrl: './trainings-modal.component.html',
    styleUrls: ['./trainings-modal.component.scss']
})
export class TrainingsModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() training: any;
    @Input() squads: Array<any> = [];
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
            name: ['', Validators.required],
            description: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', [Validators.required]],
            day: ['', Validators.required],
            interval: ['', Validators.required],
            squadId: ['', Validators.required],
        })

        if (this.training) {
            this.form.get('name')!.setValue(this.training.name)
            this.form.get('description')!.setValue(this.training.description)
            this.form.get('startTime')!.setValue(this.training.startTime)
            this.form.get('endTime')!.setValue(this.training.endTime)
            this.form.get('day')!.setValue(this.training.day)
            this.form.get('interval')!.setValue(this.training.interval)
            this.form.get('squadId')!.setValue(this.training.squadId)
            this.form!.updateValueAndValidity();
            return;
        }


    }

    get title() {
        return this.action == 'new' ? 'Add new training' : 'View training';
    }

    get buttonText() {
        return this.action == 'new' ? 'Create training' : 'Update training';
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
        let data = new Training();
        data = {
            ...data,
            ...this.form.value,
        }

        if(this.action == 'new') {
            this.trainingService.create(data).subscribe({
                next: (res: any) => {
                    this.processLoading = false;
    
                    if (!/^20.*/.test(res.status)) {
                        this.errorMessage = res.message;
                        return;
                    }
    
                    this.generalService.showSuccessMessage('Training created successfully.');
                    this.actionSuccessful.emit();
                    this.handleCancel();
                },
                error: (e: any) => {
                    this.processLoading = false;
                    this.generalService.showErrorMessage('An error occured. Please try again later.')
                }
            })
            return;
        }

        this.trainingService.updateTraining(data, this.training.id).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Training updated successfully.');
                this.actionSuccessful.emit();
                this.handleCancel();
            },
            error: (e: any) => {
                this.processLoading = false;
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
