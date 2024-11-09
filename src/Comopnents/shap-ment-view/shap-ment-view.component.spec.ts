import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapMentViewComponent } from './shap-ment-view.component';

describe('ShapMentViewComponent', () => {
  let component: ShapMentViewComponent;
  let fixture: ComponentFixture<ShapMentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapMentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapMentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
