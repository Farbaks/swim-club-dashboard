import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Signup } from 'src/app/models/auth';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users-modal',
    templateUrl: './users-modal.component.html',
    styleUrls: ['./users-modal.component.scss']
})
export class UsersModalComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    @Input() user: any;
    @Input() action: 'new' | 'edit' = 'new';
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
    @Output() actionSuccessful: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private generalService: GeneralService,
    ) {

    }

    ngOnChanges() {
        this.errorMessage = '';
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            emailAddress: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            role: ['', Validators.required],
            gender: ['', Validators.required],
            address: ['', Validators.required],
            postcode: ['', Validators.required],
        })

        if (this.user) {
            this.form.get('firstName')!.setValue(this.user.firstName)
            this.form.get('lastName')!.setValue(this.user.lastName)
            this.form.get('phoneNumber')!.setValue(this.user.phoneNumber)
            this.form.get('emailAddress')!.setValue(this.user.emailAddress)
            this.form.get('dateOfBirth')!.setValue(this.user.dateOfBirth)
            this.form.get('role')!.setValue(this.user.role)
            this.form.get('gender')!.setValue(this.user.gender)
            this.form.get('address')!.setValue(this.user.address)
            this.form.get('postcode')!.setValue(this.user.postcode)
            this.form?.disable();
            this.form!.updateValueAndValidity();
            return;
        }


    }

    get title() {
        return this.action == 'new' ? 'Add new user' : 'View user';
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
        let data = new Signup();
        data = {
            ...data,
            ...this.form.value,
            parentEmail: undefined
        }

        this.userService.signup(data).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage('User created successfully.');
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
