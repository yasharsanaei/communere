import * as Leaflet from 'leaflet';

export class LeafletStatic {
  static generateMarker(data: any): Leaflet.Marker {
    return Leaflet.marker(data.position);
  }

  static defaultMapLayers = () => ({
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 16,
    center: { lat: 51.5072, lng: 0.1276 },
  });

  static defaultIconProps = () => ({
    iconUrl: 'assets/icons/map-location.png',
    iconRetinaUrl: 'assets/icons/map-location.png',
    shadowUrl: '',
    iconSize: [32, 32],
    shadowSize: [0, 0],
  });
}
