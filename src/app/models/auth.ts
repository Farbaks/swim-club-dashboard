export class Auth {
}


export class Signup {
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';
    emailAddress: string = '';
    password: string = '';
    dateOfBirth: string = '';
    role: string = '';
    address: string = '';
    postcode: string = '';
    parentEmail: string = '';
}

export class UpdateUser {
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';
    emailAddress: string = '';
    dateOfBirth: string = '';
    address: string = '';
    postcode: string = '';
}

export class Signin {
    emailAddress: string = '';
    password: string = '';
}

export class UpdatePassword {
    oldPassword: string = '';
    newPassword: string = '';
}

export class NewWard {
    firstName: string = '';
    lastName: string = '';
    phoneNumber: string = '';
    emailAddress: string = '';
    password: string = '';
    dateOfBirth: string = '';
    address: string = '';
    postcode: string = '';
}