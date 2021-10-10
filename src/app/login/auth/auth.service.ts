import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthResponseData } from './auth-response-data.interface';
import { User } from '../auth/models/user.model';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    user = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private readonly router: Router
    ) { }


    login(email: string, password: string): Observable<AuthResponseData> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Content-Encoding', 'gzip')
            .set('Applicant-Id', `${environment.API_KEY}`)

        return this.http.post<AuthResponseData>(
            `api`, { username: email, password }, { headers }
        ).pipe(tap(resData => {
            this.handleAuthentication(resData.user.email, resData.token, resData.user.firstName, resData.user.lastName);
        }));
    }

    private handleAuthentication(email: string, token: string, firstName: string, lastName: string): void {
        const expirationDate = new Date(new Date().getTime() + 72000000);
        const user = new User(email, token, expirationDate, firstName, lastName);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogIn(): void {
        const userData: {
            email: string,
            _token: string,
            _tokenExpirationDate: Date,
            firstName: string,
            lastName: string,
        }
            = JSON.parse(localStorage.getItem('userData') || '');
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData._token,
            userData._tokenExpirationDate,
            userData.firstName,
            userData.lastName,
        );
        if (loadedUser._token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
        if (loadedUser._token) {
            this.user.next(loadedUser);
        }
    }

    logOut(): void {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
    }

    autoLogOut(expirationDuration: number): void {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut();
        }, expirationDuration);
    }
}