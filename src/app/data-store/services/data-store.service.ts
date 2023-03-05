import { Injectable } from '@angular/core';
import { db } from '../../core/utils/db';
import { Location } from '../../core/types/location/location';
import { BehaviorSubject } from 'rxjs';
import { LocationImpl } from '../../core/types/location/locationImpl';

@Injectable()
export class DataStoreService {
  private readonly _data: LocationImpl[];
  locationList$: BehaviorSubject<LocationImpl[]> = new BehaviorSubject<LocationImpl[]>([]);

  constructor() {
    const data = db().read();
    this._data = data != null ? [...data] : [];
    this.locationList$.next(this._data);
  }

  saveData(location: LocationImpl) {
    this._data.push(location);
    db().write(this._data);
    this.locationList$.next(this._data);
  }

  getData(id: string): LocationImpl | undefined {
    return this._data.find(d => d.id === id);
  }
}
