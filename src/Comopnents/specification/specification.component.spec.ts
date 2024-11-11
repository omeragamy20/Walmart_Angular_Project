import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationComponent } from './specification.component';

describe('SpecificationComponent', () => {
  let component: SpecificationComponent;
  let fixture: ComponentFixture<SpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
