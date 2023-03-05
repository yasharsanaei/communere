import { Injectable } from '@angular/core';
import { db } from '../../core/utils/db';
import { Location } from '../../core/types/location/location';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataStoreService {
  private readonly _data: Location[];
  locationList$: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);

  constructor() {
    const data = db().read();
    this._data = data != null ? [...data] : [];
    this.locationList$.next(this._data);
  }

  saveData(location: Location) {
    this._data.push(location);
    db().write(this._data);
    this.locationList$.next(this._data);
  }
}
