import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string) {
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYaC1Q9zUwKw4jU3wDGFX69XnjXdV9uTk',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map((userData) => {
          sessionStorage.setItem('username', email);
          sessionStorage.setItem('token', userData.idToken);
          return userData;
        })
      );
  }

  isLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userRole');
    localStorage.removeItem('userRole');
  }
}
