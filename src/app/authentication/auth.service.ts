import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  Authorization: String;
  username: String;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  tokenExpirationTimer;

  signin(postData) {
    return this.http
      .post<any>('login', postData, {
        observe: 'response',
      })
      .pipe(
        tap((resData) => {
          const expDate = new Date(new Date().getTime() + 3600000);
          localStorage.setItem('token', resData.headers.get('authorization'));
          localStorage.setItem('expires', JSON.stringify(expDate));
          this.autoLogout(3600000);
        })
      );
  }

  logout() {
    this.setAuthToken(null);
    this.setUsername(null);
    this.loggedIn.next(false);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  }

  autoLogin() {
    if (localStorage.getItem('token')) {
      this.setAuthToken(localStorage.getItem('token'));
      this.setUsername(localStorage.getItem('username'));
      this.loggedIn.next(true);
      const expDate = JSON.parse(localStorage.getItem('expires'));
      this.autoLogout(new Date(expDate).getTime() - new Date().getTime());
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logout(),
      expirationDuration
    );
  }

  signup(postData) {
    return this.http.post('users/', postData);
  }

  setAuthToken(token: String) {
    this.Authorization = token;
  }

  getAuthToken() {
    return this.Authorization;
  }

  setUsername(username: String) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}
