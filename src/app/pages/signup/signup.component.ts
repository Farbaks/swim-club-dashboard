import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/models/auth';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
            parentEmail: ['']
        })
    }

    ngOnInit(): void {
    }

    get age() {
        let age = new Date().getFullYear() - new Date(this.form.value.dateOfBirth).getFullYear();
        return age;
    }

    signUp() {
        if(this.processLoading) return;

        this.form.markAllAsTouched();
        this.form.markAsDirty();

        this.errorMessage = '';

        if(!this.form.valid) {
            this.errorMessage = 'Please enter all fields.'
            return;
        }

        this.processLoading = true;
        let data = new Signup();
        data = {
            ...data,
            ...this.form.value,
            parentEmail: this.age < 18 ? this.form.value.parentEmail : undefined
        }

        this.userService.signup(data).subscribe({
            next: (res:any) => {
                this.processLoading = false;

                if (!/^20.*/.test(res.status)) {
                    this.errorMessage = res.message;
                    return;
                }

                this.generalService.showSuccessMessage(res.message);
                this.generalService.saveUser(res);
                this.router.navigateByUrl('/dashboard');

            },
            error: (error:any) => {
                this.processLoading = false;
                this.errorMessage = error;
            }
        })
        

    }

}
