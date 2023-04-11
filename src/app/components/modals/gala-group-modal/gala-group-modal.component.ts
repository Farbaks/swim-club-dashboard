import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GalaGroup } from 'src/app/models/gala';
import { GalasService } from 'src/app/services/galas.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-gala-group-modal',
    templateUrl: './gala-group-modal.component.html',
    styleUrls: ['./gala-group-modal.component.scss']
})
export class GalaGroupModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() galaId: any;
    @Input() group: any;
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
            description: [''],
        })

        if (this.group) {
            this.form.get('name')!.setValue(this.group.name)
            this.form.get('description')!.setValue(this.group.description)
            this.form!.updateValueAndValidity();
            return;
        }


    }

    get title() {
        return this.action == 'new' ? 'Add new group' : 'View group';
    }

    get buttonText() {
        return this.action == 'new' ? 'Create group' : 'Update group';
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
        let data = new GalaGroup();
        data = {
            ...data,
            ...this.form.value,
            raceId: this.galaId
        }

        if (this.action == 'new') {
            this.galaService.createGalaGroup(data).subscribe({
                next: (res: any) => {
                    this.processLoading = false;

                    if (!/^20.*/.test(res.status)) {
                        this.errorMessage = res.message;
                        return;
                    }

                    this.generalService.showSuccessMessage('Gala group created successfully.');
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

        this.galaService.updateGalaGroup(data, this.group.id).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Gala group updated successfully.');
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
