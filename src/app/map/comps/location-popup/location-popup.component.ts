import { Component, Input } from '@angular/core';
import { Location } from '../../../core/types/location/location';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css'],
})
export class LocationPopupComponent {
  @Input()
  location!: Location | undefined;

  constructor(private router: Router) {}

  async editLocation() {
    await this.router.navigate(['/share-location'], {
      queryParams: {
        id: this.location?.id,
      },
    });
  }
}
