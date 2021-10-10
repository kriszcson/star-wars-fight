import { Component, OnInit } from '@angular/core';
import { Character, Side } from '../characters/character.model';
import { CharacterService } from '../characters/characters.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  characters: Character[] = [];
  started = false;
  fetched = false;
  charIndex = 0;
  selectedChars: Character[] = [];
  winnerChar: Character;

  constructor(
    private readonly characterService: CharacterService,
  ) { }

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
      this.fetched = true;
    })
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

  getWinnerCharacter(char: Character) {
    this.winnerChar = char;
  }
}
