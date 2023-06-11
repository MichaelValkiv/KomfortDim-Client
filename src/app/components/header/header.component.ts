import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faInfoCircle,
  faFileContract,
  faBars,
  faSignInAlt,
  faSignOutAlt,
  faQuestionCircle,
  faBell,
  faCog,
  faTools,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  faFileSignature = faFileContract;
  faBars = faBars;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faQuestionCircle = faQuestionCircle;
  faBell = faBell;
  faCog = faCog;
  faTools = faTools;

  @Output() public sideNavToggle = new EventEmitter();

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {}

  public onToggleSideNav = () => {
    this.sideNavToggle.emit();
  };
}
