import * as Leaflet from 'leaflet';

export interface Location {
  position: Leaflet.LatLngExpression;
  locationName: string;
  locationType: string;
}
