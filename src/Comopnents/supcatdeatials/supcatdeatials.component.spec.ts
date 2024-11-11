import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { SupcatdeatialsComponent } from './supcatdeatials.component';

describe('SupcatdeatialsComponent', () => {
  let component: SupcatdeatialsComponent;
  let fixture: ComponentFixture<SupcatdeatialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupcatdeatialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupcatdeatialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
