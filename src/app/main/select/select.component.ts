import { Component, Input, OnInit } from '@angular/core';
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
  @Output() outputFromChild : EventEmitter<string> = new EventEmitter();
  started = false;

  constructor() { }

  ngOnChanges() {
    this.doesDataExist = true;
  }


  selectChar() {
    this.characters[this.charIndex].side == Side.DARK ?
      this.choosenDark = this.characters[this.charIndex]
      : this.choosenLight = this.characters[this.charIndex]
  }

  selectedNotValid() {
    return (this.choosenDark && this.charIndex < 6)
      || (this.choosenLight && this.charIndex > 5);
  }
  indexPlus() {
    this.charIndex++;
  }

  indexMinus() {
    this.charIndex--;
  }

  start() { }
}