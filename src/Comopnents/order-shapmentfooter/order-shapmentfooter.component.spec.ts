import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShapmentfooterComponent } from './order-shapmentfooter.component';

describe('OrderShapmentfooterComponent', () => {
  let component: OrderShapmentfooterComponent;
  let fixture: ComponentFixture<OrderShapmentfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderShapmentfooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderShapmentfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
