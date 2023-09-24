import { Component, OnInit } from '@angular/core';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private themesService: ThemesService) {}

  ngOnInit() {
    this.themesService.setTheme();
  }
}
