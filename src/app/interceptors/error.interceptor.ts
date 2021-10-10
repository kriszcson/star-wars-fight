import {
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {

                    let errorMessage = {};

                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = { error: error.error.message, code: error.status };
                    } else {
                        // server-side error
                        errorMessage = { error: error.message, code: error.status };
                    }
                    return throwError(errorMessage);
                })
            )
    }
}