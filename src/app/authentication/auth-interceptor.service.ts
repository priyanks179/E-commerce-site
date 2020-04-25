import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url !== 'https://fixed-price-api.herokuapp.com/login') {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getAuthToken() + '',
        },
      });
    }
    return next.handle(req);
  }
}
