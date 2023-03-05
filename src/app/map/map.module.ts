import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { ShareNewLocationComponent } from './pages/share-new-location/share-new-location.component';
import { ViewLocationsComponent } from './pages/view-locations/view-locations.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import { MapSelectLocationComponent } from './comps/map-select-location/map-select-location.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {ReactiveFormsModule} from "@angular/forms";
import { ShowLocationsComponent } from './comps/show-locations/show-locations.component';

@NgModule({
  declarations: [ShareNewLocationComponent, ViewLocationsComponent, MapSelectLocationComponent, ShowLocationsComponent],
  imports: [CommonModule, MapRoutingModule, SharedModule, CoreModule, LeafletModule, ReactiveFormsModule],
})
export class MapModule {}
