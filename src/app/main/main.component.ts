import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import SwiperCore, { SwiperOptions, Navigation, Pagination } from 'swiper';

import { Character } from '../characters/character.model';
import { CharacterService } from '../characters/characters.service';
import { AuthService } from '../login/auth/auth.service';


SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private userSub = new Subscription();
  isAuthenticated = false;
  characters$: Observable<Character[]>;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(
    private readonly router: Router,
    private readonly authServie: AuthService,
    private readonly characterService: CharacterService,
  ) {
    this.characters$ = this.characterService.getCharacters();
    this.characters$.subscribe((data) => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.userSub = this.authServie.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
    // if (!this.isAuthenticated) this.router.navigate(['/login']);
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
