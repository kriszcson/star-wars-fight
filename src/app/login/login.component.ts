import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth/auth-response-data.interface';

import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  authObs = new Observable<AuthResponseData>();

  constructor(
    private readonly authServie: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.authObs = this.authServie.login(form.value.email, form.value.password)
    this.authObs.subscribe(
      resData => {
        this.router.navigate(['/']);
      }, errorMessage => {
        console.log("ajjaj")
      }
    )
  }
}
