import { Component, OnDestroy, OnInit } from '@angular/core';
import { Position } from '../../../core/types/map/position';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationImpl } from '../../../core/types/location/locationImpl';
import { Router } from '@angular/router';

@Component({
  selector: 'app-share-new-location',
  templateUrl: './share-new-location.component.html',
  styleUrls: ['./share-new-location.component.css'],
})
export class ShareNewLocationComponent implements OnDestroy {
  location: LocationImpl;
  newLocationForm: FormGroup;
  isFormSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.location = new LocationImpl();
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
    this.location.position = { ...$event };
  }

  async submitForm($event: SubmitEvent) {
    this.isFormSubmitted = true;
    if (this.newLocationForm.invalid || !this.location.position) return;
    this.location.locationName = this.newLocationForm.controls['locationName'].value;
    this.location.locationType = this.newLocationForm.controls['locationType'].value;
    const locationData = this.location.getLocationValue();
    //   TODO: save 'locationData' to database
    await this.router.navigateByUrl('/');
  }
}
