import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { ShareNewLocationComponent } from './pages/share-new-location/share-new-location.component';
import { ViewLocationsComponent } from './pages/view-locations/view-locations.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [ShareNewLocationComponent, ViewLocationsComponent],
  imports: [CommonModule, MapRoutingModule, SharedModule, CoreModule],
})
export class MapModule {}
