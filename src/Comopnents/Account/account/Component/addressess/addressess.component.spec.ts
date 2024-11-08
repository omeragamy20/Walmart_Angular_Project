import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressessComponent } from './addressess.component';

describe('AddressessComponent', () => {
  let component: AddressessComponent;
  let fixture: ComponentFixture<AddressessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
