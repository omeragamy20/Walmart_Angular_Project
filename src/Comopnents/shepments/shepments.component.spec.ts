import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShepmentsComponent } from './shepments.component';

describe('ShepmentsComponent', () => {
  let component: ShepmentsComponent;
  let fixture: ComponentFixture<ShepmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShepmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShepmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
