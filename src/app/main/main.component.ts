import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { swiperConfig } from './slider/config';
import { Character } from '../characters/character.model';
import { CharacterService } from '../characters/characters.service';
import { AuthService } from '../login/auth/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userSub = new Subscription();
  isAuthenticated = false;
  characters$: Observable<Character[]>;
  config = swiperConfig;
  name: string | undefined = "";


  constructor(
    private readonly router: Router,
    private readonly authServie: AuthService,
    private readonly characterService: CharacterService,
  ) {
    this.characters$ = this.characterService.getCharacters();
  }

  ngOnInit(): void {
    this.userSub = this.authServie.user.subscribe(user => {
      // if (!this.isAuthenticated) this.router.navigate(['/login']);
      this.isAuthenticated = !!user;
      this.name = user?.lastName + " " + user?.firstName;
    })
  }

}
