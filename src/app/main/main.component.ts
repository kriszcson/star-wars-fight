import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Character, Side } from '../characters/character.model';
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
  name: string = ""
  characters: Character[] = [];
  started = false;
  fetched = false;
  charIndex = 0;
  selectedChars: Character[] = [];

  constructor(
    private readonly router: Router,
    private readonly authServie: AuthService,
    private readonly characterService: CharacterService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.authServie.user.subscribe(user => {
      // if (!this.isAuthenticated) this.router.navigate(['/login']);
      this.isAuthenticated = !!user;
      this.name = user?.lastName + " " + user?.firstName;
      this.characterService.getCharacters().subscribe((data) => {
        {
          this.characters = data;
          this.fetched = true;
        }
      })
    });
  }

  getFightingCharsAndStart(selected: Character[]) {
    this.selectedChars = selected;
    this.started = true;
  }

  getBgImageSrc(): string {
    if (!this.started) {
      return "../../assets/images/background/bg_2.jpg";
    } else {
      return "../../assets/images/background/bg_3.jpg"
    }
  }
}
