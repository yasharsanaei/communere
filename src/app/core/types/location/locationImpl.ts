import { Location } from './location';
import * as Leaflet from 'leaflet';

export class LocationImpl implements Location {
  locationName: string;
  locationType: string;
  position: Leaflet.LatLngExpression;

  constructor({ locationName, locationType, position }: Location) {
    this.locationName = locationName;
    this.locationType = locationType;
    this.position = position;
  }

  getLocationValue = (): Location | null => {
    if (this.position)
      return {
        locationName: this.locationName,
        locationType: this.locationType,
        position: this.position,
      } as Location;
    else return null;
  };
}
