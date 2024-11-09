import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapementsummeryComponent } from './shapementsummery.component';

describe('ShapementsummeryComponent', () => {
  let component: ShapementsummeryComponent;
  let fixture: ComponentFixture<ShapementsummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapementsummeryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapementsummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
