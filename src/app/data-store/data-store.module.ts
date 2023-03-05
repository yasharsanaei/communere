import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStoreService } from './services/data-store.service';

@NgModule({
  declarations: [],
  providers: [DataStoreService],
  imports: [CommonModule],
})
export class DataStoreModule {
  constructor(private dataStoreService: DataStoreService) {}
}
