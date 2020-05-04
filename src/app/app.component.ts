import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.authService.loggedIn.subscribe((isAuhthenticated) => {
      if (isAuhthenticated) {
        this.dataStorageService.fetchUserDetails();
      }
    });
  }
}
