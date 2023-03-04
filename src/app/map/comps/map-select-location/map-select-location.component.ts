import { Component } from '@angular/core';

import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map-select-location',
  templateUrl: './map-select-location.component.html',
  styleUrls: ['./map-select-location.component.css'],
})
export class MapSelectLocationComponent {
  constructor() {
    Leaflet.Icon.Default.mergeOptions({
      iconUrl: 'assets/icons/map-location.png',
      iconRetinaUrl: 'assets/icons/map-location.png',
      shadowUrl: '',
      iconSize: [32, 32],
      // iconAnchor: [12, 41],
      // popupAnchor: [1, -34],
      // tooltipAnchor: [16, -28],
      shadowSize: [0, 0],
      // iconUrl: 'assets/marker-icon.png',
      // shadowUrl: 'assets/marker-shadow.png',
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

  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 51.5072, lng: 0.1276 },
      },
    ];
    initialMarkers.forEach((markerData, index) => {
      const marker = this.generateMarker(markerData, index);
      marker.addTo(this.map).bindPopup(`<b>${markerData.position.lat},  ${markerData.position.lng}</b>`);
      this.map.panTo(markerData.position);
      this.markers.push(marker);
    });
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', event => this.markerClicked(event, index))
      .on('dragend', event => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}
