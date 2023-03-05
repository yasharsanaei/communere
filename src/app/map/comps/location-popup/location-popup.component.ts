import { Component, Input } from '@angular/core';
import { Location } from '../../../core/types/location/location';

@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css'],
})
export class LocationPopupComponent {
  @Input()
  location!: Location | undefined;

  constructor() {}
}
