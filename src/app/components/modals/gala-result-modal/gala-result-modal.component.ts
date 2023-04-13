import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GalaMemberPerformance } from 'src/app/models/gala';
import { GalasService } from 'src/app/services/galas.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-gala-result-modal',
    templateUrl: './gala-result-modal.component.html',
    styleUrls: ['./gala-result-modal.component.scss']
})
export class GalaResultModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() strokes: Array<any> = [];
    @Input() result: any;
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
    @Output() actionSuccessful: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private galaService: GalasService,
        private generalService: GeneralService,
    ) {

    }

    ngOnChanges() {
        this.errorMessage = '';

        this.form = this.fb.group({
            time: ['', Validators.required],
            points: ['', Validators.required],
            strokeId: ['', Validators.required],
            rank: [''],
        })
    }

    get title() {
        return `Edit ${(this.result?.name+ '\`s') ?? '' } result`
    }

    get buttonText() {
        return 'Save results'
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
        let data = new GalaMemberPerformance();
        data = {
            ...data,
            ...this.form.value,
        }

        this.galaService.updateGalaGroupMember(data, this.result.id).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Swimmer result updated successfully.');
                this.actionSuccessful.emit();
                this.handleCancel();
            },
            error: (e: any) => {
                this.processLoading = false;
                this.errorMessage = e;
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
