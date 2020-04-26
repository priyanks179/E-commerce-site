import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}
  cartCount: number = 5;
  wishCount: number = 5;
  isLoggedIn = false;
  userSub: Subscription;
  username: String;
  cartUrl: String = null;

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data) => {
      this.cartUrl = `users/${this.authService.getUsername()}/product`;
      this.isLoggedIn = data;
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.authService.loggedIn.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
  }
}
