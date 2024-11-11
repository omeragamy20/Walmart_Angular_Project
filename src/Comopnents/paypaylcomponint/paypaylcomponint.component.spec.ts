import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypaylcomponintComponent } from './paypaylcomponint.component';

describe('PaypaylcomponintComponent', () => {
  let component: PaypaylcomponintComponent;
  let fixture: ComponentFixture<PaypaylcomponintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaypaylcomponintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaypaylcomponintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
