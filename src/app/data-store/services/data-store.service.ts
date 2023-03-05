import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { db } from '../../core/utils/db';
import { LocationImpl } from '../../core/types/location/locationImpl';

@Injectable()
export class DataStoreService {
  private _data: LocationImpl[];
  locationList$: BehaviorSubject<LocationImpl[]> = new BehaviorSubject<LocationImpl[]>([]);

  constructor() {
    const data = db().read();
    this._data = data != null ? [...data] : [];
    this.locationList$.next(this._data);
  }

  saveData(location: LocationImpl): void {
    const index = this._data.findIndex(d => d.id === location.id);
    if (index >= 0) {
      this._data[index] = location;
    } else {
      this._data.push(location);
    }
    db().write(this._data);
    this.locationList$.next(this._data);
  }

  getData(id: string): LocationImpl | undefined {
    return this._data.find(d => d.id === id);
  }

  refreshData(): void {
    const data = db().read();
    this._data = data != null ? [...data] : [];
    this.locationList$.next(this._data);
  }
}
