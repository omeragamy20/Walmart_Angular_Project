import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaginationBySubCatComponent } from './product-pagination-by-sub-cat.component';

describe('ProductPaginationBySubCatComponent', () => {
  let component: ProductPaginationBySubCatComponent;
  let fixture: ComponentFixture<ProductPaginationBySubCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPaginationBySubCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPaginationBySubCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
