import { Injectable } from '@angular/core';

@Injectable()
export class DataStoreService {
  private _data: Location[];

  constructor() {
    this._data = [];
  }
}
