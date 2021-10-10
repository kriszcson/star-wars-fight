import { Component, Input } from '@angular/core';

import { Character } from 'src/app/characters/character.model';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent {

  @Input('winnerChar') winnerChar: Character;


  returnToSelection(): void {
    window.location.reload();
  }
}
