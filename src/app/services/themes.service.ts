import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  savedTheme = localStorage.getItem('theme');
  deviceThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  getTheme(): string {
    if (this.savedTheme) {
      return this.savedTheme;
    }
    return this.deviceThemeIsDark ? 'dark' : 'light';
  }

  setTheme() {
    if (this.savedTheme) {
      document.body.setAttribute('data-theme', this.savedTheme);
    } else {
      document.body.setAttribute(
        'data-theme',
        this.deviceThemeIsDark ? 'dark' : 'light'
      );
    }
  }

  changeTheme(isLight: boolean) {
    document.body.setAttribute('data-theme', isLight ? 'light' : 'dark');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }
}
