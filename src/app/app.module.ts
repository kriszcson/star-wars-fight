import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { CharacterService } from './characters/characters.service';
import { GameComponent } from './main/game/game.component';
import { SelectComponent } from './main/select/select.component';
import { SimulationService } from './simulation/simulation.service';
import { WinnerComponent } from './main/winner/winner.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthInterceptor } from './login/auth/auth.interceptor';
import { AuthGuard } from './login/auth/auth.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    GameComponent,
    SelectComponent,
    WinnerComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, CharacterService, SimulationService, FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
