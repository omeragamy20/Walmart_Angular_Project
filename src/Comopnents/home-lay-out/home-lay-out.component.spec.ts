import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLayOutComponent } from './home-lay-out.component';

describe('HomeLayOutComponent', () => {
  let component: HomeLayOutComponent;
  let fixture: ComponentFixture<HomeLayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLayOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
