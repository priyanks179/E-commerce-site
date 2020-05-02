import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  signupMode: boolean = false;
  isAuthenticating: boolean = false;
  @ViewChild('form') form: NgForm;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  error = {
    message: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.authService.formCalled.subscribe((isCalled) => {
      this.form.reset();
      this.error.message = '';
    });
  }

  onModeChange() {
    this.signupMode = !this.signupMode;
    this.form.reset();
    this.error.message = '';
  }

  onSubmit() {
    this.isAuthenticating = true;
    if (this.signupMode) {
      this.onSignUp();
    } else {
      this.onLogin();
    }
  }

  onSignUp() {
    let postData = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.signup(postData).subscribe(
      (responseData) => {
        this.onLogin();
      },
      (error) => {
        this.error.message = 'Please Try Again';
      }
    );
  }

  onLogin() {
    let postData = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.signin(postData).subscribe(
      (res) => {
        this.authService.setAuthToken(res.headers.get('Authorization'));
        this.authService.setUsername(postData.username);
        localStorage.setItem('username', postData.username);
        this.isAuthenticating = false;
        this.dataStorageService.fetchCartCount();
        this.dataStorageService.fetchWishListCount();
        this.authService.getUserRole();
        this.closeBtn.nativeElement.click();
        this.authService.loggedIn.next(true);
        this.router.navigate(['/']);
      },
      (error) => {
        this.error.message = 'Invalid Credentials!';
        this.isAuthenticating = false;
        this.form.reset();
      }
    );
  }
}
