import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SliderComponent } from "../../ngx-slider/lib/slider.component";
import { SliderElementDirective } from "../../ngx-slider/lib/slider-element.directive";
import { SliderHandleDirective } from "../../ngx-slider/lib/slider-handle.directive";
import { SliderLabelDirective } from "../../ngx-slider/lib/slider-label.directive";
import { TooltipWrapperComponent } from "../../ngx-slider/lib/tooltip-wrapper.component";

describe("SliderComponent", () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SliderComponent,
        SliderElementDirective,
        SliderHandleDirective,
        SliderLabelDirective,
        TooltipWrapperComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    component.options = {
      floor: 0,
      ceil: 10,
    };
    component.value = 5;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
