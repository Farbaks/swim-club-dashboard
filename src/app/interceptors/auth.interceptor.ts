import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private generalService: GeneralService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let token = this.getToken();

        request = request.clone({
            setHeaders: {
                "Authorization": 'Bearer '+ token
            }
        });


        return next.handle(request).pipe(
            catchError((error:any) => {
                if (error.status === 403 || error.status === 401) {
                    this.generalService.logoutUser();
                    return throwError('Your session has expired. Please login to continue.');
                }

                return throwError(error.error?.message ?? 'An expected error occured. Please try again later.');
            })
        );
    }

    getToken() {
        return this.generalService.getToken();
    }
}
