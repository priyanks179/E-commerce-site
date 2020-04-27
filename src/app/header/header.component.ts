import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, Route } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount: number;
  wishCount: number;
  isLoggedIn = false;
  userSub: Subscription;
  cartCountSub: Subscription;
  wishCountSub: Subscription;
  username: String;
  cartUrl: String = null;
  scrollTopBtn: boolean = false;
  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.loggedIn.subscribe((data) => {
      this.cartUrl = `users/${this.authService.getUsername()}/product`;
      this.isLoggedIn = data;
    });
    if (this.isLoggedIn) {
      this.cartCountSub = this.dataStorageService.cartCount.subscribe(
        (count) => {
          this.cartCount = count;
        }
      );
      this.wishCountSub = this.dataStorageService.wishCount.subscribe(
        (count) => {
          this.wishCount = count;
        }
      );
    }
  }

  @HostListener('window:scroll')
  scrollControl() {
    if (window.scrollY > 500) {
      this.scrollTopBtn = true;
    } else {
      this.scrollTopBtn = false;
    }
  }

  scrollToElement() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy() {
    this.authService.loggedIn.unsubscribe();
    this.cartCountSub.unsubscribe();
    this.wishCountSub.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
  }
}
