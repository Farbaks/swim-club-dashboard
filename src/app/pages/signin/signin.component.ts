import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signin } from 'src/app/models/auth';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    processLoading: boolean = false;
    errorMessage: string = '';
    form: FormGroup;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private generalService: GeneralService,
        private router: Router
    ) {
        this.form = this.fb.group({
            emailAddress: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }

    ngOnInit(): void {
    }

    signin() {
        if (this.processLoading) return;

        this.form.markAllAsTouched();
        this.form.markAsDirty();

        this.errorMessage = '';

        if (!this.form.valid) {
            this.errorMessage = 'Please enter all fields.'
            return;
        }

        this.processLoading = true;
        let data = new Signin();
        data = {
            ...data,
            ...this.form.value,
        }

        this.userService.signin(data).subscribe({
            next: (res: any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage(res.message);
                this.generalService.saveUser(res);
                this.router.navigateByUrl('/dashboard');

            },
            error: (error: any) => {
                this.processLoading = false;
                this.errorMessage = error;
            }
        })


    }

}
