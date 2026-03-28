import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLogo } from './angular-logo';

describe('AngularLogo', () => {
  let component: AngularLogo;
  let fixture: ComponentFixture<AngularLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularLogo],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularLogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
