import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Character, Side } from 'src/app/characters/character.model';
import { swiperConfig } from '../slider/config';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  doesDataExist: boolean = false;
  @Input('characters') characters: Character[];
  config = swiperConfig;
  name: string | undefined = "";
  charIndex = 0;
  choosenDark: Character | null = null;
  choosenLight: Character | null = null;
  @Output() characterEmitter: EventEmitter<Character[]> = new EventEmitter();
  started = false;

  constructor() { }

  ngOnChanges() {
    this.doesDataExist = true;
  }


  selectChar(): void {
    this.characters[this.charIndex].side == Side.DARK ?
      this.choosenDark = this.characters[this.charIndex]
      : this.choosenLight = this.characters[this.charIndex]
  }

  selectedNotValid(): boolean | null {
    return (this.choosenDark && this.charIndex < 6)
      || (this.choosenLight && this.charIndex > 5);
  }

  indexPlus(): void {
    this.charIndex++;
  }

  indexMinus(): void {
    this.charIndex--;
  }

  start(): void {
    let fightingCharacters: Character[] = [this.choosenDark || this.characters[0], this.choosenLight || this.characters[7]];
    this.characterEmitter.emit(fightingCharacters);
  }
}
