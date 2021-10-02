import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private readonly authServie: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.authServie.login(form.value.email, form.value.password);
  }

  getCharacters() {
    this.authServie.getCharacters();
  }

}
