import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddSquadMember } from 'src/app/models/squad';
import { GeneralService } from 'src/app/services/general.service';
import { SquadService } from 'src/app/services/squad.service';

@Component({
  selector: 'app-squad-member-modal',
  templateUrl: './squad-member-modal.component.html',
  styleUrls: ['./squad-member-modal.component.scss']
})
export class SquadMemberModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() squad: any;
    @Input() swimmers: Array<any> = [];
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
            swimmer: ['', Validators.required],
        })
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
        let data = new AddSquadMember();
        data = {
            ...data,
            ...this.form.value,
        }

        this.squadService.addSquadMember(data, this.squad.id).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Squad member added successfully.');
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
