import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { ErrorObject } from './auth/models/error.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  error: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }


  onSubmit(): void {
    this.authService.login(this.form.email.value, this.form.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/'])
        },
        error => {
          this.handlingError(error);
        });
  }

  handlingError(error: ErrorObject) {
    switch (error.code) {
      case 500: this.error = "Sikertelen azonosítás!";
        break;
      case 400: this.error = "Nincs ApplicantId";
        break;
    }
  }

  get form() {
    return this.signinForm.controls;
  }
}
