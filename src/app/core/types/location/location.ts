import { Position } from '../map/position';

export interface Location {
  position: Position | undefined;
  locationName: string;
  locationType: string;
}
