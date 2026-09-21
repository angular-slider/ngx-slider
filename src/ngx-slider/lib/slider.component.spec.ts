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

  it('should survive being destroyed before the view is initialised', () => {
    // The resize observer is only created in ngAfterViewInit, but ngOnDestroy always
    // disconnects it - a slider inside a short-lived conditional view hits exactly this.
    const uninitialised: ComponentFixture<SliderComponent> = TestBed.createComponent(SliderComponent);

    expect(() => uninitialised.destroy()).not.toThrow();
  });

  it('should keep the model value as-is when enforceStepsArray meets an empty stepsArray', () => {
    component.options = { stepsArray: [], enforceStepsArray: true };

    expect(() => fixture.detectChanges()).not.toThrow();
    expect(component.value).toBe(5);
  });

  it('should mark for check when the animate host binding changes', () => {
    // Under zoneless change detection, the animate class is toggled from event
    // handlers and setTimeouts, so it must schedule change detection to avoid
    // ExpressionChangedAfterItHasBeenCheckedError (NG0100).
    const changeDetectorRef: { markForCheck: () => void } = (component as any).changeDetectionRef;
    const markForCheck: jasmine.Spy = spyOn(changeDetectorRef, 'markForCheck');

    component.sliderElementAnimateClass = !component.sliderElementAnimateClass;

    expect(markForCheck).toHaveBeenCalled();
  });

  it('should not mark for check when the animate host binding is set to the same value', () => {
    const changeDetectorRef: { markForCheck: () => void } = (component as any).changeDetectionRef;
    const markForCheck: jasmine.Spy = spyOn(changeDetectorRef, 'markForCheck');

    component.sliderElementAnimateClass = component.sliderElementAnimateClass;

    expect(markForCheck).not.toHaveBeenCalled();
  });
});
