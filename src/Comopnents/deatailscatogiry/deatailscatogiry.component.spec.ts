import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeatailscatogiryComponent } from './deatailscatogiry.component';

describe('DeatailscatogiryComponent', () => {
  let component: DeatailscatogiryComponent;
  let fixture: ComponentFixture<DeatailscatogiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeatailscatogiryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeatailscatogiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
