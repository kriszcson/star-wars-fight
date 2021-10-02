import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthResponseData } from './auth-response-data.interface';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private token: string = '';

    constructor(private http: HttpClient) { }


    login(email: string, password: string): Subscription {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Content-Encoding', 'gzip')
            .set('Applicant-Id', `${environment.API_KEY}`)

        return this.http.post<AuthResponseData>(`api`,
            { username: email, password }, { headers }
        ).subscribe((data) => {
            this.token = data.token;
        });
    }

    getCharacters() {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Content-Encoding', 'gzip')
            .set('Applicant-Id', `${environment.API_KEY}`)
            .set('Application-Authorization', `Bearer ${this.token}`);

        return this.http.get<any>(`characters`,
            { headers }
        ).subscribe((data) => {
            console.log(data);
        });
    }
}
