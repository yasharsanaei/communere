import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewLocationsComponent} from "./pages/view-locations/view-locations.component";
import {ShareNewLocationComponent} from "./pages/share-new-location/share-new-location.component";

const routes: Routes = [
  {
    path: '',
    component: ViewLocationsComponent
  },
  {
    path: 'share-location',
    component: ShareNewLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {
}
