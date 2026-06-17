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
});
