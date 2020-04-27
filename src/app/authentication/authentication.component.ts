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

  ngOnInit(): void {}

  onModeChange() {
    this.signupMode = !this.signupMode;
  }

  onSubmit() {
    this.isAuthenticating = true;
    if (this.signupMode) {
      this.onSignUp();
    } else {
      this.onLogin();
    }
    this.dataStorageService.fetchCartCount();
    this.dataStorageService.fetchWishListCount();
  }

  onSignUp() {
    let postData = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    console.log(postData);

    this.authService.signup(postData).subscribe(
      (responseData) => {
        this.onLogin();
      },
      (error) => {
        this.error.message = 'Some error occurred!';
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
        this.authService.loggedIn.next(true);
        this.isAuthenticating = false;
        this.closeBtn.nativeElement.click();
        this.router.navigate(['/']);
      },
      (error) => {
        this.error.message = 'Some error occurred';
      }
    );
  }
}
