import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gala } from 'src/app/models/gala';
import { GalasService } from 'src/app/services/galas.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-gala-modal',
    templateUrl: './gala-modal.component.html',
    styleUrls: ['./gala-modal.component.scss']
})
export class GalaModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() gala: any;
    @Input() action: 'new' | 'edit' = 'new';
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
            name: ['', Validators.required],
            description: ['', Validators.required],
            requirements: [''],
            startDate: ['', Validators.required],
            endDate: ['', [Validators.required]]
        })

        if (this.gala) {
            this.form.get('name')!.setValue(this.gala.name)
            this.form.get('description')!.setValue(this.gala.description)
            this.form.get('requirements')!.setValue(this.gala.requirements)
            this.form.get('startDate')!.setValue(this.gala.startDate)
            this.form.get('endDate')!.setValue(this.gala.endDate)
            this.form!.updateValueAndValidity();
            return;
        }


    }

    get title() {
        return this.action == 'new' ? 'Add new gala' : 'View gala';
    }

    get buttonText() {
        return this.action == 'new' ? 'Create gala' : 'Update gala';
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
        let data = new Gala();
        data = {
            ...data,
            ...this.form.value,
        }

        if (this.action == 'new') {
            this.galaService.createGala(data).subscribe({
                next: (res: any) => {
                    this.processLoading = false;

                    if (!/^20.*/.test(res.status)) {
                        this.errorMessage = res.message;
                        return;
                    }

                    this.generalService.showSuccessMessage('Gala created successfully.');
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

        this.galaService.updateGala(data, this.gala.id).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Gala updated successfully.');
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
