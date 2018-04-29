import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  Ng2SliderComponent,
  SliderDirective,
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
 } from './ng2-slider.component';

describe('Ng2SliderComponent', () => {
  let component: Ng2SliderComponent;
  let fixture: ComponentFixture<Ng2SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule
      ],
      declarations: [
        Ng2SliderComponent,
        Ng2SliderComponent,
        SliderDirective,
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
