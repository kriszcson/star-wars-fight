import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponseData } from './auth-response-data.interface';
import { User } from './user.model';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    user = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient) { }


    login(email: string, password: string): Observable<AuthResponseData> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Content-Encoding', 'gzip')
            .set('Applicant-Id', `${environment.API_KEY}`)

        return this.http.post<AuthResponseData>(
            `api`, { username: email, password }, { headers }
        ).pipe(
            catchError((errorRes, caught) => {
                return throwError(errorRes.message);
            }),
            tap(resData => {
                const expirationDate = new Date(new Date().getTime() + 3600000);
                const user = new User(
                    resData.user.email,
                    resData.user.firstName,
                    resData.user.lastName,
                    resData.token,
                    expirationDate
                );
                this.user.next(user);
            }))
    }

}
