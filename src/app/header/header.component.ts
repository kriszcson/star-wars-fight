import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../login/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userSub = new Subscription();
  isAuthenticated = false;
  name: string = ""

  constructor(
    private readonly authservice: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!this.isAuthenticated) this.router.navigate(['/login']);
      this.name = user?.lastName + " " + user?.firstName;
    })
  }

  logout(): void {
    this.userSub.unsubscribe();
    this.authservice.logOut();
  }
}
