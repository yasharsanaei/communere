import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNewLocationComponent } from './share-new-location.component';

describe('ShareNewLocationComponent', () => {
  let component: ShareNewLocationComponent;
  let fixture: ComponentFixture<ShareNewLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareNewLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareNewLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
