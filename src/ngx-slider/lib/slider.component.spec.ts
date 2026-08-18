import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SliderComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    component.options = {
      floor: 0,
      ceil: 10
    };
    component.value = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ignore a window resize that arrives before the view is initialised', () => {
    // A fresh fixture that has not been change-detected has no view children yet, so
    // minHandleElement is still undefined - exactly the state a window resize can catch.
    const uninitialised: ComponentFixture<SliderComponent> = TestBed.createComponent(SliderComponent);

    expect(() => uninitialised.componentInstance.onResize(new Event('resize'))).not.toThrow();
  });
});