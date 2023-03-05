import { Location } from './location';
import { Position } from '../map/position';

export class LocationImpl implements Location {
  locationName: string;
  locationType: string;
  position: Position | undefined;

  constructor({ locationName, locationType, position }: Location = {} as Location) {
    this.locationName = locationName ?? '';
    this.locationType = locationType ?? '';
    this.position = position ? ({ ...position } as Position) : undefined;
  }
}
