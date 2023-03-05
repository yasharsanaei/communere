import { Injectable } from '@angular/core';
import { db } from '../../core/utils/db';
import { Location } from '../../core/types/location/location';

@Injectable()
export class DataStoreService {
  private readonly _data: Location[];

  constructor() {
    const data = db().read();
    this._data = data != null ? [...data] : [];
  }

  saveData(location: Location) {
    this._data.push(location);
    db().write(this._data);
  }
}
