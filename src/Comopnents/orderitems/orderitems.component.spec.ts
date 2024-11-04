import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemsComponent } from './orderitems.component';

describe('OrderitemsComponent', () => {
  let component: OrderitemsComponent;
  let fixture: ComponentFixture<OrderitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderitemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
