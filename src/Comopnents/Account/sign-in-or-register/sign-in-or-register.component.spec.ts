import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOrRegisterComponent } from './sign-in-or-register.component';

describe('SignInOrRegisterComponent', () => {
  let component: SignInOrRegisterComponent;
  let fixture: ComponentFixture<SignInOrRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInOrRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInOrRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
