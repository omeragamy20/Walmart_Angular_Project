import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderviewComponent } from './orderview.component';

describe('OrderviewComponent', () => {
  let component: OrderviewComponent;
  let fixture: ComponentFixture<OrderviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
