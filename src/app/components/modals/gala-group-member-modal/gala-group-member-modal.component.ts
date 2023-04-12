import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GalaGroupMember } from 'src/app/models/gala';
import { GalasService } from 'src/app/services/galas.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
    selector: 'app-gala-group-member-modal',
    templateUrl: './gala-group-member-modal.component.html',
    styleUrls: ['./gala-group-member-modal.component.scss']
})
export class GalaGroupMemberModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    isMemberOfClub: boolean = true;
    @Input() group: any;
    @Input() swimmers: Array<any> = [];
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
        this.isMemberOfClub = true;
        this.changeSwimmerType();
    }

    get title() {
        return 'Add new swimmer'
    }

    get buttonText() {
        return 'Add swimmer'
    }

    handleCancel() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    changeSwimmerType() {
        if(this.isMemberOfClub) {
            this.form = this.fb.group({
                swimmerId: ['', Validators.required],
            })
            return;
        }

        this.form = this.fb.group({
            name: ['', Validators.required],
            age: ['', Validators.required],
            club: ['', Validators.required]
        })
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
        let data = new GalaGroupMember();
        data = {
            ...data,
            ...this.form.value,
            raceGroupId: this.group.id
        }

        this.galaService.createGalaGroupMembers(data).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('Swimmer added to group successfully.');
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
