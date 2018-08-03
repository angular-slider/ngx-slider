import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  SliderComponent,
  RightOutSelDirective,
  LeftOutSelDirective,
  FullBarDirective,
  SelBarDirective,
  MinHDirective,
  MaxHDirective,
  FlrLabDirective,
  CeilLabDirective,
  MinLabDirective,
  MaxLabDirective,
  CmbLabDirective,
  TicksDirective
} from './slider.component';

import { TooltipWrapperComponent } from './tooltip-wrapper.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule
      ],
      declarations: [
        SliderComponent,
        RightOutSelDirective,
        LeftOutSelDirective,
        FullBarDirective,
        SelBarDirective,
        MinHDirective,
        MaxHDirective,
        FlrLabDirective,
        CeilLabDirective,
        MinLabDirective,
        MaxLabDirective,
        CmbLabDirective,
        TicksDirective,
        TooltipWrapperComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
