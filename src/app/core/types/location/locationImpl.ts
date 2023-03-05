import { Location } from './location';
import * as Leaflet from 'leaflet';
import { generateId } from '../../utils/unique-id';

export class LocationImpl implements Location {
  id: string;
  locationName: string;
  locationType: string;
  position: Leaflet.LatLngExpression;

  constructor({ locationName, locationType, position }: Location) {
    this.id = generateId();
    this.locationName = locationName;
    this.locationType = locationType;
    this.position = position;
  }
}
