import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take, tap } from "rxjs/operators";

import { AuthService } from "../login/auth/auth.service";
import { User } from "../login/auth/models/user.model";
import { environment } from "src/environments/environment";
import { Character, Side } from "../characters/character.model";

@Injectable()
export class SimulationService {
    user: User | null = null;

    constructor(
        private http: HttpClient,
        private readonly authService: AuthService
    ) { }

    getSimulation(fightingChars: Character[]): Observable<any> {
        let characters = {
            dark:
                fightingChars[0].side == Side.DARK ? fightingChars[0].id : fightingChars[1].id,
            light:
                fightingChars[1].side == Side.LIGHT ? fightingChars[1].id : fightingChars[0].id
        }
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                const headers = new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Content-Encoding', 'gzip')
                    .set('Applicant-Id', `${environment.API_KEY}`)
                return this.http.post<any>(
                    `simulate`, characters, { headers }
                );
            }),
            tap(data => {
                return data;
            })
        )
    }
}
