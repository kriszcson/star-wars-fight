import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { AuthService } from "../login/auth/auth.service";
import { User } from "../login/auth/user.model";
import { Character } from "./character.model";

@Injectable()
export class CharacterService {

    user: User | null = null;

    constructor(
        private http: HttpClient,
        private readonly authService: AuthService
    ) { }

    getCharacters(): Observable<Character[]> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                const headers = new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Content-Encoding', 'gzip')
                    .set('Applicant-Id', `${environment.API_KEY}`)
                    .set('Application-Authorization', `Bearer ${user?.token}`);
                return this.http.get<any>(
                    `characters`, { headers }
                );
            }),
            map(data => {
                return data.characters.map((character: any) => {
                    return {
                        ...character
                    };
                });
            }),
            tap(characters => {
                return characters;
            })
        )
    }
}