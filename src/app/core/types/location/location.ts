import * as Leaflet from 'leaflet';

export interface Location {
  id?: string;
  position: Leaflet.LatLngExpression;
  locationName: string;
  locationType: string;
}
