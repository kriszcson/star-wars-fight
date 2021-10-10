import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Character, Side } from 'src/app/characters/character.model';
import { SimulationService } from 'src/app/simulation/simulation.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {


  @Input('selectedChars') selectedChars: Character[];
  @Output() winnerCharcharacterEmitter: EventEmitter<Character> = new EventEmitter();

  simulationID: string;
  leftCharHP = 100;
  rightCharHp = 100;
  simulationSub: Subscription;


  constructor(
    private readonly simulationService: SimulationService
  ) { }

  ngOnInit(): void {
    this.simulationService.getSimulation(this.selectedChars).subscribe((data: any) => {
      this.simulationID = data;
      this.simulationSub = interval(2000).subscribe(func => {
        this.randomIntFromInterval();
        if (this.leftCharHP < 1 || this.rightCharHp < 1) {
          this.leftCharHP < 1 ? this.leftCharHP = 0 : this.rightCharHp = 0;
          this.simulationSub.unsubscribe();
          setTimeout((() => {
            this.winnerCharcharacterEmitter.emit(this.leftCharHP < 1 ? this.selectedChars[1] : this.selectedChars[0]);
          }), 3000)
        }
      })
    })
  }

  randomIntFromInterval() {
    const randomDamage = Math.floor(Math.random() * 25 + 1);

    Math.floor(Math.random() * 2 + 1) == 1 ?
      this.leftCharHP -= randomDamage : this.rightCharHp -= randomDamage;

    if (this.leftCharHP < 1 || this.rightCharHp < 1) {
      this.leftCharHP < 1 ? this.leftCharHP = 0 : this.rightCharHp = 0;
    }
  }


  getNameWithoutHtml(char: Character) {
    return char.name.replace('<br>', ' ')
  }

  getSide(char: Character) {
    return char.side == Side.DARK ? 'Sötét' : 'Világos';
  }

  getHpNgStyle(side: string) {
    return {
      'width':
        side == 'left' ?
          this.leftCharHP + '%'
          : this.rightCharHp + '%'
    };
  }

  getMarginForPercent(side: string) {
    return {
      [`margin-${side}`]: side == 'left' ? ` ${100 - this.leftCharHP}%` : ` ${100 - this.rightCharHp}%`
    };
  }

}
