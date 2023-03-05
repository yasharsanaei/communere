import { Location } from './location';
import { Position } from '../map/position';

export class LocationImpl implements Location {
  locationName: string;
  locationType: string;
  position: Position;

  constructor(locationName: string, locationType: string, position: Position) {
    this.locationName = locationName;
    this.locationType = locationType;
    this.position = { ...position };
  }
}
