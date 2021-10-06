import { Component, Input, OnInit } from '@angular/core';
import { Character, Side } from 'src/app/characters/character.model';
import { SimulationService } from 'src/app/simulation/simulation.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input('selectedChars') selectedChars: Character[];

  simulationID: string;


  constructor(
    private readonly simulationService: SimulationService
  ) { }

  ngOnInit(): void {
    this.simulationService.getSimulation(this.selectedChars).subscribe((data: any) => {
      this.simulationID = data;
    })
  }

  getNameWithoutHtml(char: Character) {
    return char.name.replace('<br>', ' ')
  }

  getSide(char: Character) {
    return char.side == Side.DARK ? 'Sötét' : 'Világos';
  }

}
