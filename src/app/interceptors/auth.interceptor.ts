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
                    return throwError(() => ({
                        statusCode: 403,
                        message: 'Your session has expired. Please login to continue.'
                    }));
                }
                else {
                    // console.log(error)
                    return throwError(() => ({
                        statusCode: 500,
                        message: error
                    }));
                }
            })
        );
    }

    getToken() {
        return this.generalService.getToken();
    }
}
