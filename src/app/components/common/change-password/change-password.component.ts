import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdatePassword } from 'src/app/models/auth';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
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
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
        })
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
        let data = new UpdatePassword();
        data = {
            ...data,
            ...this.form.value,
        }

        this.userService.updatePassword(data).subscribe({
            next: (res:any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }
                this.generalService.showSuccessMessage(res.message);
                this.form.reset();

            },
            error: (e: any) => {
                this.processLoading = false;
                this.errorMessage = e;
                this.generalService.showErrorMessage('An error occured. Please try again later.')
            }
        })
    }
}
