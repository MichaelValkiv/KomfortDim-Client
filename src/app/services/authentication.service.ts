import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(username, password) {
    return this.http
      .post<any>('https://komfortdim.herokuapp.com/authenticate', {
        username,
        password,
      })
      .pipe(
        map((userData) => {
          sessionStorage.setItem('username', username);
          const tokenString = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenString);
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
