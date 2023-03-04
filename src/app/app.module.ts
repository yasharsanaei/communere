import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataStoreModule } from './data-store/data-store.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DataStoreModule, LeafletModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
