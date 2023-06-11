import { Component, OnInit } from '@angular/core';
import {
  faInfoCircle,
  faFileContract,
  faMapMarkerAlt,
  faQuestionCircle,
  faBell,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  faFileSignature = faFileContract;
  faMapMarkerAlt = faMapMarkerAlt;
  faQuestionCircle = faQuestionCircle;
  faBell = faBell;
  faTools = faTools;

  constructor() {}

  ngOnInit() {}
}
