import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { LeafletStatic } from '../../../core/types/map/leaflet-static';
import { DataStoreService } from '../../../data-store/services/data-store.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-show-locations',
  templateUrl: './show-locations.component.html',
  styleUrls: ['./show-locations.component.css'],
})
export class ShowLocationsComponent implements OnInit, OnDestroy {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    ...LeafletStatic.defaultMapLayers(),
  };

  constructor(private dataStoreService: DataStoreService) {
    Leaflet.Icon.Default.mergeOptions(LeafletStatic.defaultIconProps());
  }

  ngOnInit(): void {
    this.dataStoreService.locationList$.subscribe({
      next: locationList => {
        this.markers = locationList.map(l => LeafletStatic.generateMarker(l.position));
      },
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.markers.forEach(m => m.addTo(this.map));
  }
}
