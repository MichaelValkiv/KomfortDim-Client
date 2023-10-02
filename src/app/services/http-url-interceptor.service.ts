import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpUrlInterceptorService implements HttpInterceptor {
  baseUrl = 'https://komfortdim.firebaseio.com/';

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url !==
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYaC1Q9zUwKw4jU3wDGFX69XnjXdV9uTk'
    ) {
      const reqWithUrl = req.clone({
        url: this.baseUrl + req.url,
      });
      return next.handle(reqWithUrl);
    } else {
      const reqWithUrl = req.clone({
        url: req.url,
      });
      return next.handle(reqWithUrl);
    }
  }
}
