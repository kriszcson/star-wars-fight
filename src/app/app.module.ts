import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CharacterService } from './characters/characters.service';
import { GameComponent } from './main/game/game.component';
import { SelectComponent } from './main/select/select.component';
import { SimulationService } from './simulation/simulation.service';
import { WinnerComponent } from './main/winner/winner.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    GameComponent,
    SelectComponent,
    WinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxUsefulSwiperModule
  ],
  providers: [CharacterService, SimulationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
