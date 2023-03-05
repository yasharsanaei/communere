import { Component, OnDestroy } from '@angular/core';
import { Position } from '../../../core/types/map/position';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoreService } from '../../../data-store/services/data-store.service';
import * as Leaflet from 'leaflet';
import { LocationImpl } from '../../../core/types/location/locationImpl';

@Component({
  selector: 'app-share-new-location',
  templateUrl: './share-new-location.component.html',
  styleUrls: ['./share-new-location.component.css'],
})
export class ShareNewLocationComponent implements OnDestroy {
  private position: Leaflet.LatLngExpression | undefined;

  newLocationForm: FormGroup;
  isFormSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataStoreService: DataStoreService) {
    this.isFormSubmitted = false;
    this.newLocationForm = this.formBuilder.group({
      locationName: ['', Validators.compose([Validators.required])],
      locationType: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnDestroy(): void {
    console.log('');
  }

  handleSelectedLocation($event: Position) {
    this.position = { ...$event };
  }

  async submitForm() {
    this.isFormSubmitted = true;
    if (this.newLocationForm.invalid || !this.position) return;
    const locationName = this.newLocationForm.controls['locationName'].value;
    const locationType = this.newLocationForm.controls['locationType'].value;
    const location = new LocationImpl({
      locationName,
      locationType,
      position: this.position,
    });
    this.dataStoreService.saveData(location);
    await this.router.navigateByUrl('/');
  }
}
