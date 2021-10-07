import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/characters/character.model';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {

  @Input('winnerChar') winnerChar: Character;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {

  }

  returnToSelection() {
    window.location.reload();
  }
}
