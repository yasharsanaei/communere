import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { Subject, takeUntil } from 'rxjs';

import { Position } from '../../../core/types/map/position';
import { DataStoreService } from '../../../data-store/services/data-store.service';
import { LocationImpl } from '../../../core/types/location/locationImpl';

@Component({
  selector: 'app-share-new-location',
  templateUrl: './share-new-location.component.html',
  styleUrls: ['./share-new-location.component.css'],
})
export class ShareNewLocationComponent implements OnDestroy {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  private _position: Leaflet.LatLngExpression | undefined;
  private _existingLocation: LocationImpl | undefined;

  newLocationForm: FormGroup;
  isFormSubmitted: boolean;
  initialPosition: Leaflet.LatLngExpression | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dataStoreService: DataStoreService
  ) {
    this.isFormSubmitted = false;
    this.newLocationForm = this._formBuilder.group({
      locationName: ['', Validators.compose([Validators.required])],
      locationType: ['', Validators.compose([Validators.required])],
    });
    this._activatedRoute.queryParams.pipe(takeUntil(this._onDestroy$)).subscribe({
      next: params => this.updateForm(params),
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private updateForm(params: Record<string, string>) {
    this._existingLocation = this._dataStoreService.getData(params['id']);
    if (this._existingLocation?.locationName) this.newLocationForm.controls['locationName'].setValue(this._existingLocation.locationName);
    if (this._existingLocation?.locationType) this.newLocationForm.controls['locationType'].setValue(this._existingLocation.locationType);
    if (this._existingLocation?.position) {
      this.initialPosition = this._existingLocation?.position;
      this._position = this._existingLocation?.position;
    }
  }

  handleSelectedLocation($event: Position) {
    this._position = { ...$event };
  }

  async submitForm() {
    this.isFormSubmitted = true;
    if (this.newLocationForm.invalid || !this._position) return;
    const locationName = this.newLocationForm.controls['locationName'].value as string;
    const locationType = this.newLocationForm.controls['locationType'].value as string;
    if (this._existingLocation) {
      this._existingLocation.locationName = locationName;
      this._existingLocation.locationType = locationType;
      this._existingLocation.position = this._position;
      this._dataStoreService.saveData(this._existingLocation);
    } else {
      const location = new LocationImpl({
        locationName,
        locationType,
        position: this._position,
      });
      this._dataStoreService.saveData(location);
    }
    await this._router.navigateByUrl('/');
  }
}
