import { Component } from '@angular/core';
import {
  faMapMarkerAlt,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faMapMarkerAlt = faMapMarkerAlt;
  faExternalLinkAlt = faExternalLinkAlt;
}
