import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { ShareNewLocationComponent } from './pages/share-new-location/share-new-location.component';
import { ViewLocationsComponent } from './pages/view-locations/view-locations.component';
import { CoreModule } from '../core/core.module';
import { MapSelectLocationComponent } from './comps/map-select-location/map-select-location.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowLocationsComponent } from './comps/show-locations/show-locations.component';
import { LocationPopupComponent } from './comps/location-popup/location-popup.component';

@NgModule({
  declarations: [
    ShareNewLocationComponent,
    ViewLocationsComponent,
    MapSelectLocationComponent,
    ShowLocationsComponent,
    LocationPopupComponent,
  ],
  imports: [CommonModule, MapRoutingModule, CoreModule, LeafletModule, ReactiveFormsModule],
})
export class MapModule {}
