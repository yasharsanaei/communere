import { Component, EventEmitter, Output } from '@angular/core';

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
  }

  mapClicked($event: LeafletMouseEvent) {
    const position: Position = { lat: $event.latlng.lat, lng: $event.latlng.lng };
    const markerData = { position };
    if (this.markers && this.markers.length > 0) this.markers.pop()?.removeFrom(this.map);
    const marker = LeafletStatic.generateMarker(markerData)
      .addTo(this.map)
      .bindPopup(`<b>${markerData.position.lat},  ${markerData.position.lng}</b>`);
    this.markers.push(marker);
    this.selectedLocation.emit(position);
  }
}
