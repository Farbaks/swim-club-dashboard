import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUser } from 'src/app/models/auth';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    errorMessage: string = '';
    processLoading: boolean = false;
    form!: FormGroup;
    user: any;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private generalService: GeneralService
    ) {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            emailAddress: ['', [Validators.required, Validators.email]],
            dateOfBirth: ['', Validators.required],
            gender: ['', Validators.required],
            address: ['', Validators.required],
            postcode: ['', Validators.required],
        })

        this.getUserInfo();
    }

    getUserInfo() {
        this.user = this.generalService.getUser();
        if (this.user) {
            this.form.get('firstName')!.setValue(this.user.firstName)
            this.form.get('lastName')!.setValue(this.user.lastName)
            this.form.get('phoneNumber')!.setValue(this.user.phoneNumber)
            this.form.get('emailAddress')!.setValue(this.user.emailAddress)
            this.form.get('dateOfBirth')!.setValue(this.user.dateOfBirth)
            this.form.get('gender')!.setValue(this.user.gender)
            this.form.get('address')!.setValue(this.user.address)
            this.form.get('postcode')!.setValue(this.user.postcode)

            this.form.get('dateOfBirth')!.disable();
            this.form!.updateValueAndValidity();
            return;
        }
    }

    updateForm() {
        if(this.processLoading) return;

        this.form.markAllAsTouched();
        this.form.markAsDirty();

        this.errorMessage = '';

        if(!this.form.valid) {
            this.errorMessage = 'Please enter all fields.'
            return;
        }

        this.processLoading = true;
        let data = new UpdateUser();
        data = {
            ...data,
            ...this.form.value,
        }

        this.userService.updateUser(data).subscribe({
            next: (res:any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }
                this.generalService.showSuccessMessage(res.message);
                this.generalService.refreshUser();

            },
            error: (e: any) => {
                this.processLoading = false;
                this.errorMessage = e;
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
