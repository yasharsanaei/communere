import { AfterViewInit, ApplicationRef, Component, ComponentRef, NgZone, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import * as Leaflet from 'leaflet';
import { Subject, takeUntil } from 'rxjs';

import { LeafletStatic } from '../../../core/types/map/leaflet-static';
import { DataStoreService } from '../../../data-store/services/data-store.service';
import { LocationPopupComponent } from '../location-popup/location-popup.component';
import { Location } from '../../../core/types/location/location';
import { LatLngBoundsExpression } from 'leaflet';

@Component({
  selector: 'app-show-locations',
  templateUrl: './show-locations.component.html',
  styleUrls: ['./show-locations.component.css'],
})
export class ShowLocationsComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  map!: Leaflet.Map;
  locationList: Location[] = [];
  options = {
    ...LeafletStatic.defaultMapLayers(),
  };

  constructor(
    private dataStoreService: DataStoreService,
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private zone: NgZone
  ) {
    Leaflet.Icon.Default.mergeOptions(LeafletStatic.defaultIconProps());
  }

  ngOnInit(): void {
    this.dataStoreService.locationList$.pipe(takeUntil(this._onDestroy$)).subscribe({
      next: locationList => (this.locationList = [...locationList]),
    });
  }

  ngAfterViewInit(): void {
    this.zone.run(() => {
      this.locationList.forEach(l => {
        const popup = this.compilePopup(LocationPopupComponent, l);
        LeafletStatic.generateMarker(l.position).addTo(this.map).bindPopup(popup);
      });
      const mapBounds = this.locationList.map(l => {
        const { lat, lng } = l.position as any;
        return [lat, lng];
      });
      this.map.setZoom(this.map.getBoundsZoom(mapBounds as LatLngBoundsExpression));
      this.map.panInsideBounds(mapBounds as LatLngBoundsExpression);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  private compilePopup(component: any, locationData: Location): any {
    const compFactory: ComponentRef<any> = this.viewContainerRef.createComponent(component);
    compFactory.setInput('location', locationData);
    compFactory.onDestroy(() => this.appRef.detachView(compFactory.hostView));
    compFactory.changeDetectorRef.detectChanges();
    return compFactory.location.nativeElement;
  }
}
