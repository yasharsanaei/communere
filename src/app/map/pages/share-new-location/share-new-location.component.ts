import { Component, OnDestroy } from '@angular/core';
import { Position } from '../../../core/types/map/position';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStoreService } from '../../../data-store/services/data-store.service';
import * as Leaflet from 'leaflet';
import { LocationImpl } from '../../../core/types/location/locationImpl';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-share-new-location',
  templateUrl: './share-new-location.component.html',
  styleUrls: ['./share-new-location.component.css'],
})
export class ShareNewLocationComponent implements OnDestroy {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();
  private _position: Leaflet.LatLngExpression | undefined;

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
    params['locationName'] && this.newLocationForm.controls['locationName'].setValue(params['locationName']);
    params['locationType'] && this.newLocationForm.controls['locationType'].setValue(params['locationType']);
    if (params['lat'] && params['lng']) {
      this.initialPosition = { lat: +params['lat'], lng: +params['lng'] };
    }
  }

  handleSelectedLocation($event: Position) {
    this._position = { ...$event };
  }

  async submitForm() {
    this.isFormSubmitted = true;
    if (this.newLocationForm.invalid || !this._position) return;
    const locationName = this.newLocationForm.controls['locationName'].value;
    const locationType = this.newLocationForm.controls['locationType'].value;
    const location = new LocationImpl({
      locationName,
      locationType,
      position: this._position,
    });
    this._dataStoreService.saveData(location);
    await this._router.navigateByUrl('/');
  }
}
