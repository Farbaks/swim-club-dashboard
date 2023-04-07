import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Squad } from 'src/app/models/squad';
import { GeneralService } from 'src/app/services/general.service';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-squad-modal',
  templateUrl: './squad-modal.component.html',
  styleUrls: ['./squad-modal.component.scss']
})
export class SquadModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() squad: any;
    @Input() coaches: Array<any> = [];
    @Input() action: 'new' | 'edit' = 'new';
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
    @Output() actionSuccessful: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private squadService: SquadService,
        private generalService: GeneralService,
    ) {

    }

    ngOnChanges() {
        this.errorMessage = '';
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            rank: [''],
            coachId: ['', Validators.required],
        })

        if (this.squad) {
            this.form.get('name')!.setValue(this.squad.name)
            this.form.get('description')!.setValue(this.squad.description)
            this.form.get('rank')!.setValue(this.squad.rank)
            this.form.get('coachId')!.setValue(this.squad.coachId);
            this.form!.updateValueAndValidity();
            return;
        }


    }

    get title() {
        return this.action == 'new' ? 'Add new squad' : 'View user';
    }

    get buttonText() {
        return this.action == 'new' ? 'Create squad' : 'Update squad';
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
        let data = new Squad();
        data = {
            ...data,
            ...this.form.value,
            rank: this.form.value.rank != '' ? this.form.value.rank : undefined
        }

        if(this.action == 'new') {
            this.squadService.createSquad(data).subscribe({
                next: (res: any) => {
                    this.processLoading = false;
    
                    if (!/^20.*/.test(res.status)) {
                        this.errorMessage = res.message;
                        return;
                    }
    
                    this.generalService.showSuccessMessage('Squad created successfully.');
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

        this.squadService.updateSquad(data, this.squad.id).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Squad updated successfully.');
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
