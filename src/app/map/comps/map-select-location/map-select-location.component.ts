import { Component, EventEmitter, Output } from '@angular/core';

import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map-select-location',
  templateUrl: './map-select-location.component.html',
  styleUrls: ['./map-select-location.component.css'],
})
export class MapSelectLocationComponent {
  @Output()
  selectedLocation: EventEmitter<any> = new EventEmitter();

  constructor() {
    Leaflet.Icon.Default.mergeOptions({
      iconUrl: 'assets/icons/map-location.png',
      iconRetinaUrl: 'assets/icons/map-location.png',
      shadowUrl: '',
      iconSize: [32, 32],
      shadowSize: [0, 0],
    });
  }

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 16,
    center: { lat: 51.5072, lng: 0.1276 },
  };

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position).on('click', event => this.markerClicked(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  mapClicked($event: any) {
    const markerData = {
      position: { lat: $event.latlng.lat, lng: $event.latlng.lng },
    };
    const marker = this.generateMarker(markerData, 0);
    marker.addTo(this.map).bindPopup(`<b>${markerData.position.lat},  ${markerData.position.lng}</b>`);
    // this.map.panTo(markerData.position);
    this.markers.push(marker);
  }

  markerClicked($event: any, index: number) {
    console.log($event);
  }
}
