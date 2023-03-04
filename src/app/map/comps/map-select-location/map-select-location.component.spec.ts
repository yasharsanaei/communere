import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectLocationComponent } from './map-select-location.component';

describe('MapSelectLocationComponent', () => {
  let component: MapSelectLocationComponent;
  let fixture: ComponentFixture<MapSelectLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapSelectLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
