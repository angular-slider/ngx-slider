import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SliderHandleDirective } from './slider-handle.directive';

@Component({
  standalone: true,
  imports: [SliderHandleDirective],
  template: '<span ngxSliderHandle></span>'
})
class TestHostComponent {
  @ViewChild(SliderHandleDirective, { static: true })
  public handle: SliderHandleDirective;
}

describe('SliderHandleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: SliderHandleDirective;
  let handleDebugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    directive = fixture.componentInstance.handle;
    handleDebugElement = fixture.debugElement.query(By.directive(SliderHandleDirective));
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should reflect the active state on the ngx-slider-active host class', () => {
    // Under zoneless change detection, the active class is toggled from pointer
    // event handlers, so it must schedule change detection to avoid
    // ExpressionChangedAfterItHasBeenCheckedError (NG0100).
    directive.active = true;
    fixture.detectChanges();
    expect(handleDebugElement.nativeElement.classList.contains('ngx-slider-active')).toBe(true);

    directive.active = false;
    fixture.detectChanges();
    expect(handleDebugElement.nativeElement.classList.contains('ngx-slider-active')).toBe(false);
  });

  it('should mark for check when the active state changes', () => {
    const changeDetectorRef: { markForCheck: () => void } = (directive as any).changeDetectionRef;
    const markForCheck: jasmine.Spy = spyOn(changeDetectorRef, 'markForCheck');

    directive.active = true;

    expect(markForCheck).toHaveBeenCalled();
  });

  it('should not mark for check when the active state is unchanged', () => {
    const changeDetectorRef: { markForCheck: () => void } = (directive as any).changeDetectionRef;
    const markForCheck: jasmine.Spy = spyOn(changeDetectorRef, 'markForCheck');

    directive.active = false;

    expect(markForCheck).not.toHaveBeenCalled();
  });
});
