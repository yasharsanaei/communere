import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { ShareNewLocationComponent } from './pages/share-new-location/share-new-location.component';
import { ViewLocationsComponent } from './pages/view-locations/view-locations.component';

@NgModule({
  declarations: [ShareNewLocationComponent, ViewLocationsComponent],
  imports: [CommonModule, MapRoutingModule],
})
export class MapModule {}
