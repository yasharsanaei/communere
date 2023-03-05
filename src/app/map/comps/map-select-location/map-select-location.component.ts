import { Component, EventEmitter, Input, Output } from '@angular/core';

import * as Leaflet from 'leaflet';
import { LeafletStatic } from '../../../core/types/map/leaflet-static';
import { LeafletMouseEvent } from 'leaflet';
import { Position } from '../../../core/types/map/position';

@Component({
  selector: 'app-map-select-location',
  templateUrl: './map-select-location.component.html',
  styleUrls: ['./map-select-location.component.css'],
})
export class MapSelectLocationComponent {
  @Input()
  initialPosition: Leaflet.LatLngExpression | undefined;

  @Output()
  selectedLocation: EventEmitter<Position> = new EventEmitter();

  constructor() {
    Leaflet.Icon.Default.mergeOptions(LeafletStatic.defaultIconProps());
  }

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    ...LeafletStatic.defaultMapLayers(),
  };

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    if (this.initialPosition) {
      const marker = LeafletStatic.generateMarker(this.initialPosition).addTo(this.map);
      this.map.setZoomAround(marker.getLatLng(), 16, { animate: true });
      this.map.panTo(marker.getLatLng());
      this.markers.push(marker);
    }
  }

  mapClicked($event: LeafletMouseEvent) {
    const position: Position = { lat: $event.latlng.lat, lng: $event.latlng.lng };
    if (this.markers && this.markers.length > 0) this.markers.pop()?.removeFrom(this.map);
    const marker = LeafletStatic.generateMarker(position).addTo(this.map);
    this.map.panTo(marker.getLatLng());
    this.markers.push(marker);
    this.selectedLocation.emit(position);
  }
}
