import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapLocation } from '../../../core/types/map/map-location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-share-new-location',
  templateUrl: './share-new-location.component.html',
  styleUrls: ['./share-new-location.component.css'],
})
export class ShareNewLocationComponent implements OnInit, OnDestroy {
  newLocationForm: FormGroup;
  isFormSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.isFormSubmitted = false;
    this.newLocationForm = this.formBuilder.group({
      locationName: ['', Validators.compose([Validators.required])],
      locationType: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    console.log('');
  }

  ngOnDestroy(): void {
    console.log('');
  }

  handleSelectedLocation($event: MapLocation) {}

  submitForm($event: SubmitEvent) {
    this.isFormSubmitted = true;
    console.log($event);
  }
}
