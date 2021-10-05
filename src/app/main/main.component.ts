import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { swiperConfig } from './slider/config';
import { Character, Side } from '../characters/character.model';
import { CharacterService } from '../characters/characters.service';
import { AuthService } from '../login/auth/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userSub = new Subscription();
  isAuthenticated = false;
  characters: Character[] = [];
  characters$: Observable<Character[]>;
  actualChar: Observable<Character>;
  config = swiperConfig;
  name: string | undefined = "";
  charIndex = 0;
  choosenDark: Character | null = null;
  choosenLight: Character | null = null;


  constructor(
    private readonly router: Router,
    private readonly authServie: AuthService,
    private readonly characterService: CharacterService,
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.authServie.user.subscribe(user => {
      // if (!this.isAuthenticated) this.router.navigate(['/login']);
      this.isAuthenticated = !!user;
      this.name = user?.lastName + " " + user?.firstName;
    })
    this.characters$ = this.characterService.getCharacters();
    this.getActualCharacter();
  }

  getActualCharacter() {
    this.actualChar = this.characterService.getCharacters()
      .pipe(
        map(chars => chars.find(char => chars.indexOf(char) == this.charIndex) || this.characters[0])
      );
  }

  selectChar() {
    this.actualChar.subscribe((char) => {
      char.side == Side.DARK ? this.choosenDark = char : this.choosenLight = char
    });
  }

  indexPlus() {
    this.charIndex++;
    this.getActualCharacter();
  }

  indexMinus() {
    this.charIndex--;
    this.getActualCharacter();
  }

  selectedNotValid() {
    return (this.choosenDark && this.charIndex < 6)
      || (this.choosenLight && this.charIndex > 5);
  }

  start() {
    this.router.navigate(['game'], { state: { choosenDark: this.choosenDark, choosenLight: this.choosenLight } });
  }
}
