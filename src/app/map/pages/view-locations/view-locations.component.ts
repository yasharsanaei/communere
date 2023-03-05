import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-locations',
  templateUrl: './view-locations.component.html',
  styleUrls: ['./view-locations.component.css'],
})
export class ViewLocationsComponent {
  constructor(private _title: Title) {
    this._title.setTitle('View Locations');
  }
}
