import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { ThemesService } from '../../services/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faBars = faBars;

  isLight: boolean;

  @Output() public sideNavToggle = new EventEmitter();

  constructor(
    public authenticationService: AuthenticationService,
    private themesService: ThemesService
  ) {}

  ngOnInit() {
    this.isLight = this.themesService.getTheme() !== 'dark';
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    this.themesService.changeTheme(this.isLight);
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }
}
