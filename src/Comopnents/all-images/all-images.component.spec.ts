import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllImagesComponent } from './all-images.component';

describe('AllImagesComponent', () => {
  let component: AllImagesComponent;
  let fixture: ComponentFixture<AllImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
